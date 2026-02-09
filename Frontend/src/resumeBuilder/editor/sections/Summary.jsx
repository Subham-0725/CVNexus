// src/resumeBuilder/editor/sections/Summary.jsx
import { useState, useEffect } from "react";
import SectionHeader from "../shared/SectionHeader";
import { validateWordCount } from "../../utils/validation";

export default function Summary({ value, onChange }) {
  const [validation, setValidation] = useState({
    valid: true,
    error: "",
    count: 0,
  });

  useEffect(() => {
    setValidation(validateWordCount(value, 500));
  }, [value]);

  return (
    <section className="mb-8">
      <SectionHeader
        title="Professional Summary"
        subtitle="Your elevator pitch."
      />

      <div
        className={`relative rounded-xl border-2 transition-colors p-1 ${
          validation.valid
            ? "border-stone-100 focus-within:border-stone-800"
            : "border-orange-100 focus-within:border-orange-300"
        }`}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          className="w-full block rounded-lg border-0 bg-stone-50 p-4 text-stone-800 placeholder:text-stone-400 focus:bg-white focus:ring-0 sm:text-sm sm:leading-6 resize-none transition-all"
          placeholder="Experienced software engineer with a focus on..."
        />
        <div className="flex justify-between items-center px-2 py-2 mt-1">
          {validation.error ? (
            <span className="text-xs text-orange-600 font-medium flex items-center gap-1">
              ⚠️ {validation.error}
            </span>
          ) : (
            <span className="text-xs text-stone-400">
              Be concise and impactful.
            </span>
          )}
          <span className="text-xs font-mono text-stone-400 bg-stone-100 px-2 py-1 rounded">
            {validation.count} / 500
          </span>
        </div>
      </div>
    </section>
  );
}
