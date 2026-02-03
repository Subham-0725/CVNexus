import SectionHeader from "../shared/SectionHeader";
import TextInput from "../shared/TextInput";
import TextArea from "../shared/TextArea";

export default function Projects({ value = [], onChange }) {
  const addItem = () => {
    onChange([
      ...value,
      {
        id: crypto.randomUUID(),
        title: "",
        link: "",
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

  return (
    <section>
      <SectionHeader title="Projects" />

      <div className="space-y-6">
        {value.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 space-y-3">
            <TextInput
              label="Project Title"
              value={item.title}
              onChange={(v) => updateItem(item.id, "title", v)}
            />
            <TextInput
              label="Project Link"
              value={item.link}
              onChange={(v) => updateItem(item.id, "link", v)}
            />
            <TextArea
              label="Description"
              value={item.description}
              onChange={(v) => updateItem(item.id, "description", v)}
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
          + Add Project
        </button>
      </div>
    </section>
  );
}
