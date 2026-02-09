import { useState, useEffect } from "react";
import SectionHeader from "../shared/SectionHeader";
import TextInput from "../shared/TextInput";
import TextArea from "../shared/TextArea";
import { validateURL, validateWordCount } from "../../utils/validation";

export default function Projects({ value = [], onChange }) {
  const [errors, setErrors] = useState({});

  const addItem = () => {
    onChange([
      ...value,
      { id: crypto.randomUUID(), title: "", link: "", description: "" },
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
      const itemErrors = {};
      if (item.link && !validateURL(item.link).valid)
        itemErrors.link = validateURL(item.link).error;
      if (item.description && !validateWordCount(item.description, 300).valid)
        itemErrors.description = validateWordCount(item.description, 300).error;
      if (Object.keys(itemErrors).length > 0) newErrors[item.id] = itemErrors;
    });
    setErrors(newErrors);
  }, [value]);

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
      <SectionHeader title="Key Projects" subtitle="Showcase your best work." />

      <div className="grid grid-cols-1 gap-6">
        {value.map((item) => {
          const wordCount = validateWordCount(item.description, 300);
          return (
            <div
              key={item.id}
              className="bg-white border-l-4 border-stone-800 shadow-sm rounded-r-lg p-6 relative group"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <TextInput
                  label="Project Title"
                  value={item.title}
                  onChange={(v) => updateItem(item.id, "title", v)}
                  placeholder="e.g. E-Commerce Dashboard"
                  className="font-bold"
                />
                <TextInput
                  label="Live Link / Repo"
                  value={item.link}
                  onChange={(v) => updateItem(item.id, "link", v)}
                  placeholder="https://github.com/..."
                  error={errors[item.id]?.link}
                />
              </div>

              <TextArea
                label="What did you solve?"
                value={item.description}
                onChange={(v) => updateItem(item.id, "description", v)}
                error={errors[item.id]?.description}
                helperText={`${wordCount.count}/300 characters`}
                className="bg-stone-50"
              />

              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 p-2 text-stone-300 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
              >
                <span className="text-xs font-bold uppercase tracking-wider">
                  Remove
                </span>
              </button>
            </div>
          );
        })}

        <button
          type="button"
          onClick={addItem}
          className="flex items-center justify-center gap-2 py-3 px-6 bg-stone-900 text-stone-50 rounded-lg hover:bg-stone-700 hover:shadow-lg transition-all transform active:scale-95 mx-auto"
        >
          <span>Add Project</span>
        </button>
      </div>
    </section>
  );
}
