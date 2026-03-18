import { useState } from "react";
import SectionHeader from "../shared/SectionHeader";
import TextInput from "../shared/TextInput";
import TextArea from "../shared/TextArea";
import { improveText } from "../../../lib/api/ai";
import { cleanText } from "../../../lib/utils/cleanText";

export default function Projects({ value = [], onChange }) {
  const [loadingId, setLoadingId] = useState(null);
  const [aiError, setAiError] = useState({});
  const [previous, setPrevious] = useState({});

  const addItem = () => onChange([...value, { id: crypto.randomUUID(), title: "", link: "", description: "" }]);
  const updateItem = (id, key, val) => onChange(value.map((item) => (item.id === id ? { ...item, [key]: val } : item)));
  const removeItem = (id) => onChange(value.filter((item) => item.id !== id));

  const handleImprove = async (item) => {
    if (!item.description) return;
    try {
      setLoadingId(item.id);
      setPrevious((prev) => ({ ...prev, [item.id]: item.description }));
      const improved = await improveText(item.description, "project");
      updateItem(item.id, "description", cleanText(improved));
    } catch (err) {
      setAiError((prev) => ({ ...prev, [item.id]: "AI failed." }));
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section className="space-y-6">
      <SectionHeader title="Key Projects" subtitle="Showcase your best independent or side work." />
      <div className="space-y-6">
        {value.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm transition-all hover:shadow-md">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <TextInput label="Project Title" value={item.title} onChange={(v) => updateItem(item.id, "title", v)} placeholder="Name of Project" />
              <TextInput label="Project Link" value={item.link} onChange={(v) => updateItem(item.id, "link", v)} placeholder="GitHub or Live URL" />
            </div>
            <TextArea label="Description" value={item.description} onChange={(v) => updateItem(item.id, "description", v)} placeholder="Describe what you built..." />
            <div className="flex justify-between items-center mt-5">
              <div className="flex gap-2">
                <button onClick={() => handleImprove(item)} disabled={loadingId === item.id || !item.description} className="text-[11px] font-bold bg-slate-900 text-white px-5 py-2 rounded-full active:scale-95 disabled:opacity-30">
                  {loadingId === item.id ? "..." : "✨ AI Improve"}
                </button>
                {previous[item.id] && <button onClick={() => updateItem(item.id, "description", previous[item.id])} className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 px-2 transition-colors">Undo</button>}
              </div>
              <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 transition-colors p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        ))}
        <button onClick={addItem} className="w-full py-4 border-2 border-dotted border-slate-200 rounded-xl text-slate-400 text-sm hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/20 transition-all font-medium">
          + New Project
        </button>
      </div>
    </section>
  );
}