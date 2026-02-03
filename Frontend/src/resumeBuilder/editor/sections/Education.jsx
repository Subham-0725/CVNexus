import SectionHeader from "../shared/SectionHeader";
import TextInput from "../shared/TextInput";

export default function Education({ value = [], onChange }) {
  const addItem = () => {
    onChange([
      ...value,
      {
        id: crypto.randomUUID(),
        institution: "",
        degree: "",
        year: "",
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

  return (
    <section>
      <SectionHeader title="Education" />

      <div className="space-y-6">
        {value.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 space-y-3">
            <TextInput
              label="Institution"
              value={item.institution}
              onChange={(v) => updateItem(item.id, "institution", v)}
            />
            <TextInput
              label="Degree"
              value={item.degree}
              onChange={(v) => updateItem(item.id, "degree", v)}
            />
            <TextInput
              label="Year"
              value={item.year}
              onChange={(v) => updateItem(item.id, "year", v)}
            />
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="text-sm text-red-500"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="text-sm text-blue-600"
        >
          + Add Education
        </button>
      </div>
    </section>
  );
}
