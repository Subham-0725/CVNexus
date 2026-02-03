// src/resumeBuilder/editor/shared/TextArea.jsx
export default function TextArea({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 4,
}) {
  return (
    <label className="block space-y-1">
      <span className="text-sm text-slate-600">{label}</span>
      <textarea
        rows={rows}
        value={value || ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring"
      />
    </label>
  );
}
