import { useEffect, useLayoutEffect, useRef, useState } from "react";

const A4_HEIGHT_PX = 1122; // 297mm approx at 96dpi
const A4_PADDING_PX = 96; // 20mm top + bottom approx

export default function A4PaginatedDocument({ children }) {
  const measureRef = useRef(null);
  const [pages, setPages] = useState([]);

  useLayoutEffect(() => {
    const container = measureRef.current;
    if (!container) return;

    const elements = Array.from(container.children);

    const newPages = [];
    let currentPage = [];
    let currentHeight = 0;

    const maxHeight = A4_HEIGHT_PX - A4_PADDING_PX;

    elements.forEach((el) => {
      const elHeight = el.offsetHeight;

      if (currentHeight + elHeight > maxHeight) {
        if (currentPage.length) {
          newPages.push(currentPage);
        }
        currentPage = [el];
        currentHeight = elHeight;
      } else {
        currentPage.push(el);
        currentHeight += elHeight;
      }
    });

    if (currentPage.length) {
      newPages.push(currentPage);
    }

    setPages(newPages);
  }, [children]);

  return (
    <>
      {/* Hidden measurement container */}
      <div
        ref={measureRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          width: "210mm",
          padding: "20mm",
        }}
      >
        {children}
      </div>

      {/* Render paginated pages */}
      {pages.map((page, pageIndex) => (
        <div key={pageIndex} className="a4-page">
          {page.map((node, i) => (
            <div key={i} dangerouslySetInnerHTML={{ __html: node.outerHTML }} />
          ))}
        </div>
      ))}
    </>
  );
}
