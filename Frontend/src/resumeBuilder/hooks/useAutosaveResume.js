import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

export default function useAutosaveResume(resumeId, resumeData) {
  const { getToken } = useAuth();
  const [status, setStatus] = useState("idle"); // "idle" | "saving" | "saved" | "error"
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!resumeId || !resumeData) return;

    // Debounce autosave so we don't hit the API on every keystroke
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        const token = await getToken();
        if (!token) {
          console.warn("No auth token for autosave");
          setStatus("error");
          return;
        }

        setStatus("saving");

        await axios.patch(
          `http://localhost:5000/api/v1/resumes/${resumeId}`,
          {
            data: resumeData,
            isDraft: true,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setStatus("saved");
      } catch (err) {
        console.error("Autosave failed:", err);
        setStatus("error");
      }
    }, 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [resumeId, resumeData, getToken]);

  return { status };
}

