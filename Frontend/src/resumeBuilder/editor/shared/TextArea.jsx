// src/resumeBuilder/editor/shared/TextArea.jsx
export default function TextArea({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  error = "",
  helperText = "",
}) {
  return (
    <label className="block space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-600">{label}</span>
        {helperText && <span className="text-xs text-slate-500">{helperText}</span>}
      </div>
      <textarea
        rows={rows}
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
