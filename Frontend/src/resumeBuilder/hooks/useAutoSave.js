// src/resumeBuilder/hooks/useAutoSave.js
import { useEffect, useRef } from "react";

export default function useAutoSave(data, onSave, delay = 1000) {
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      onSave?.(data);
    }, delay);

    return () => clearTimeout(timeoutRef.current);
  }, [data, onSave, delay]);
}
