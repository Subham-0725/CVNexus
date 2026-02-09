// src/resumeBuilder/editor/shared/TextInput.jsx
export default function TextInput({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  error = "",
}) {
  return (
    <label className="block space-y-1">
      <span className="text-sm text-slate-600">{label}</span>
      <input
        type={type}
        value={value || ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring ${
          error ? "border-red-500 focus:ring-red-200" : ""
        }`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </label>
  );
}
