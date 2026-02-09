import { useState, useEffect } from "react";
import SectionHeader from "../shared/SectionHeader";
import TextInput from "../shared/TextInput";
import TextArea from "../shared/TextArea";
import { validateWordCount } from "../../utils/validation";

export default function WorkExperience({ value = [], onChange }) {
  const [errors, setErrors] = useState({});

  const addItem = () => {
    onChange([
      ...value,
      {
        id: crypto.randomUUID(),
        role: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const updateItem = (id, key, val) => {
    onChange(
      value.map((item) => (item.id === id ? { ...item, [key]: val } : item)),
    );
  };

  const removeItem = (id) => {
    onChange(value.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const newErrors = {};
    value.forEach((item) => {
      if (item.description) {
        const validation = validateWordCount(item.description, 300);
        if (!validation.valid) {
          newErrors[item.id] = validation.error;
        }
      }
    });
    setErrors(newErrors);
  }, [value]);

  return (
    <section>
      <SectionHeader title="Work Experience" />

      <div className="space-y-6">
        {value.map((item) => {
          const wordCount = validateWordCount(item.description, 300);
          return (
            <div key={item.id} className="border rounded-lg p-4 space-y-3">
              <TextInput
                label="Role"
                value={item.role}
                onChange={(v) => updateItem(item.id, "role", v)}
              />
              <TextInput
                label="Company"
                value={item.company}
                onChange={(v) => updateItem(item.id, "company", v)}
              />
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  label="Start Date"
                  value={item.startDate}
                  onChange={(v) => updateItem(item.id, "startDate", v)}
                />
                <TextInput
                  label="End Date"
                  value={item.endDate}
                  onChange={(v) => updateItem(item.id, "endDate", v)}
                />
              </div>
              <TextArea
                label="Description"
                value={item.description}
                onChange={(v) => updateItem(item.id, "description", v)}
                error={errors[item.id]}
                helperText={`${wordCount.count}/300 characters`}
              />
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-sm text-red-500"
              >
                Remove
              </button>
            </div>
          );
        })}

        <button
          type="button"
          onClick={addItem}
          className="text-sm text-blue-600"
        >
          + Add Experience
        </button>
      </div>
    </section>
  );
}
