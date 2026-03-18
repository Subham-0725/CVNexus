import { useState } from "react";
import SectionHeader from "../shared/SectionHeader";
import TextInput from "../shared/TextInput";
import { improveText } from "../../../lib/api/ai";
import { cleanText } from "../../../lib/utils/cleanText";

export default function Education({ value = [], onChange }) {
  const [loadingId, setLoadingId] = useState(null);
  const [aiError, setAiError] = useState({});
  const [previous, setPrevious] = useState({});

  const addItem = () => onChange([...value, { id: crypto.randomUUID(), institution: "", degree: "", year: "", description: "" }]);
  const updateItem = (id, key, val) => onChange(value.map((item) => (item.id === id ? { ...item, [key]: val } : item)));
  const removeItem = (id) => onChange(value.filter((item) => item.id !== id));

  const handleImprove = async (item) => {
    if (!item.description) return;
    try {
      setLoadingId(item.id);
      setPrevious((prev) => ({ ...prev, [item.id]: item.description }));
      const improved = await improveText(item.description, "education");
      updateItem(item.id, "description", cleanText(improved));
    } catch (err) {
      setAiError((prev) => ({ ...prev, [item.id]: "AI improvement failed." }));
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SectionHeader title="Education" subtitle="Your academic background and credentials." />
      <div className="space-y-6">
        {value.map((item) => (
          <div key={item.id} className="group relative bg-white border border-slate-200 rounded-2xl p-6 transition-all hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5">
            <button onClick={() => removeItem(item.id)} className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <TextInput label="Institution" value={item.institution} onChange={(v) => updateItem(item.id, "institution", v)} placeholder="University Name" />
              <TextInput label="Degree / Field" value={item.degree} onChange={(v) => updateItem(item.id, "degree", v)} placeholder="e.g. B.S. in Computer Science" />
            </div>
            <div className="mb-5">
              <TextInput label="Year" value={item.year} onChange={(v) => updateItem(item.id, "year", v)} placeholder="e.g. 2020 – 2024" />
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-slate-700 ml-1">Academic Highlights</label>
              <textarea
                rows={3}
                value={item.description || ""}
                onChange={(e) => updateItem(item.id, "description", e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none"
                placeholder="GPA, awards, or relevant coursework..."
              />
            </div>
            <div className="flex gap-3 items-center mt-4">
              <button
                onClick={() => handleImprove(item)}
                disabled={loadingId === item.id || !item.description}
                className="flex items-center gap-2 text-xs font-bold bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-40 transition-all active:scale-95"
              >
                {loadingId === item.id ? "..." : "✨ Optimize with AI"}
              </button>
            </div>
          </div>
        ))}
        <button onClick={addItem} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-medium hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/30 transition-all flex items-center justify-center gap-2">
          + Add Education
        </button>
      </div>
    </section>
  );
}