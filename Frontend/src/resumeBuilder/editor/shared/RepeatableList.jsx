// src/resumeBuilder/editor/shared/RepeatableList.jsx
export default function RepeatableList({ items = [], onChange, placeholder }) {
  const updateItem = (index, value) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  const addItem = () => onChange([...items, ""]);
  const removeItem = (index) => onChange(items.filter((_, i) => i !== index));

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            value={item}
            placeholder={placeholder}
            onChange={(e) => updateItem(index, e.target.value)}
            className="flex-1 rounded-md border px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={addItem} className="text-sm text-blue-600">
        + Add
      </button>
    </div>
  );
}
