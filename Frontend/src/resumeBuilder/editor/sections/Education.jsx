import { useState, useEffect } from "react";
import SectionHeader from "../shared/SectionHeader";
import TextInput from "../shared/TextInput";
import { validateWordCount } from "../../utils/validation";

export default function Education({ value = [], onChange }) {
  const [errors, setErrors] = useState({});

  const addItem = () => {
    onChange([
      ...value,
      {
        id: crypto.randomUUID(),
        institution: "",
        degree: "",
        year: "",
        description: "",
      },
    ]);
  };

  const updateItem = (id, key, val) =>
    onChange(
      value.map((item) => (item.id === id ? { ...item, [key]: val } : item)),
    );

  const removeItem = (id) => onChange(value.filter((item) => item.id !== id));

  useEffect(() => {
    const newErrors = {};
    value.forEach((item) => {
      if (item.description && !validateWordCount(item.description, 150).valid) {
        newErrors[item.id] = validateWordCount(item.description, 150).error;
      }
    });
    setErrors(newErrors);
  }, [value]);

  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SectionHeader
        title="Academic History"
        subtitle="Where did you build your foundation?"
      />

      <div className="space-y-5">
        {value.map((item, index) => {
          const wordCount = validateWordCount(item.description, 150);
          return (
            <div
              key={item.id}
              className="group relative bg-white border border-stone-200 rounded-xl p-6 transition-all duration-300 hover:border-stone-400 hover:shadow-md"
            >
              <div className="absolute -left-3 top-6 w-6 h-6 bg-stone-100 text-stone-500 rounded-full flex items-center justify-center text-xs font-bold border border-stone-200">
                {index + 1}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                <div className="md:col-span-8">
                  <TextInput
                    label="Institution"
                    value={item.institution}
                    onChange={(v) => updateItem(item.id, "institution", v)}
                    placeholder="University of Design"
                    className="font-bold text-stone-800"
                  />
                </div>
                <div className="md:col-span-4">
                  <TextInput
                    label="Year(s)"
                    value={item.year}
                    onChange={(v) => updateItem(item.id, "year", v)}
                    placeholder="2019 - 2023"
                  />
                </div>
                <div className="md:col-span-12">
                  <TextInput
                    label="Degree / Certification"
                    value={item.degree}
                    onChange={(v) => updateItem(item.id, "degree", v)}
                    placeholder="B.Sc. Human Computer Interaction"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Highlights
                  </label>
                  <span
                    className={`text-xs font-mono ${wordCount.valid ? "text-stone-400" : "text-orange-600"}`}
                  >
                    {wordCount.count}/150
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={item.description || ""}
                  placeholder="Graduated Cum Laude. President of the Design Club."
                  onChange={(e) =>
                    updateItem(item.id, "description", e.target.value)
                  }
                  className={`w-full bg-stone-50 rounded-lg border px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-1 transition-all resize-none ${
                    errors[item.id]
                      ? "border-orange-300 focus:border-orange-500 focus:ring-orange-200"
                      : "border-stone-200 focus:border-stone-800 focus:ring-stone-200"
                  }`}
                />
              </div>

              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="absolute top-4 right-4 p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                title="Remove Entry"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            </div>
          );
        })}

        <button
          type="button"
          onClick={addItem}
          className="w-full py-4 border-2 border-dashed border-stone-200 rounded-xl text-stone-500 font-medium hover:border-stone-400 hover:text-stone-800 hover:bg-stone-50 transition-all flex items-center justify-center gap-2 group"
        >
          <span className="bg-stone-200 text-stone-600 rounded-full w-6 h-6 flex items-center justify-center group-hover:bg-stone-800 group-hover:text-white transition-colors">
            +
          </span>
          Add Education
        </button>
      </div>
    </section>
  );
}
