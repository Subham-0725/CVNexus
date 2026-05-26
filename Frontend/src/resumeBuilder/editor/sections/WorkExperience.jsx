import { useState } from "react";
import SectionHeader from "../shared/SectionHeader";
import TextInput from "../shared/TextInput";
import { improveText } from "../../../lib/api/ai";
import { cleanText } from "../../../lib/utils/cleanText";

export default function WorkExperience({ value = [], onChange, errors = {} }) {
  const [loadingId, setLoadingId] = useState(null);
  const [aiError, setAiError] = useState({});
  const [previous, setPrevious] = useState({});

  const addItem = () => onChange([...value, { id: crypto.randomUUID(), company: "", role: "", duration: "", description: "" }]);
  const updateItem = (id, key, val) => onChange(value.map((item) => (item.id === id ? { ...item, [key]: val } : item)));
  const removeItem = (id) => onChange(value.filter((item) => item.id !== id));

  const handleImprove = async (item) => {
    if (!item.description) return;
    try {
      setLoadingId(item.id);
      setPrevious((prev) => ({ ...prev, [item.id]: item.description }));
      const improved = await improveText(item.description, "experience");
      updateItem(item.id, "description", cleanText(improved));
      setAiError((prev) => ({ ...prev, [item.id]: "" }));
    } catch (err) {
      setAiError((prev) => ({ ...prev, [item.id]: "AI improvement failed." }));
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SectionHeader title="Work Experience" subtitle="Focus on your impact and results." />
      <div className="space-y-6">
        {value.map((item, index) => (
          <div key={item.id} className="group relative bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5">
            <button onClick={() => removeItem(item.id)} className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <TextInput label="Company" value={item.company} onChange={(v) => updateItem(item.id, "company", v)} placeholder="e.g. Google" />
              <TextInput label="Role" value={item.role} onChange={(v) => updateItem(item.id, "role", v)} placeholder="e.g. Software Engineer" />
            </div>
            <div className="mb-5">
              <TextInput label="Duration" value={item.duration} onChange={(v) => updateItem(item.id, "duration", v)} placeholder="Jan 2023 – Present" />
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-slate-700 ml-1">Description</label>
              <textarea
                rows={4}
                value={item.description || ""}
                onChange={(e) => updateItem(item.id, "description", e.target.value)}
                spellCheck={true}
                autoCorrect="on"
                autoCapitalize="sentences"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none"
                placeholder="Describe your achievements..."
              />
              <p className="text-xs text-slate-400 mt-1">
                Tip: Right-click underlined words to fix spelling
              </p>
            </div>
            <div className="flex gap-3 items-center mt-4">
              <button
                onClick={() => handleImprove(item)}
                disabled={loadingId === item.id || !item.description}
                className="flex items-center gap-2 text-xs font-bold bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-40 transition-all active:scale-95"
              >
                {loadingId === item.id ? "..." : "✨ Refine with AI"}
              </button>
              {previous[item.id] && (
                <button onClick={() => updateItem(item.id, "description", previous[item.id])} className="text-xs font-medium px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Undo</button>
              )}
            </div>
            {aiError[item.id] && <p className="text-xs text-red-500 mt-2">{aiError[item.id]}</p>}
            {(errors[`workExperience_${index}`] || []).slice(0, 3).map((error, errorIndex) => (
              <p key={`${item.id}-${errorIndex}`} className="text-xs text-red-500 mt-1">
                {error}
              </p>
            ))}
          </div>
        ))}
        <button onClick={addItem} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-medium hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/30 transition-all flex items-center justify-center gap-2">
          <span className="text-lg">+</span> Add Experience
        </button>
      </div>
    </section>
  );
}