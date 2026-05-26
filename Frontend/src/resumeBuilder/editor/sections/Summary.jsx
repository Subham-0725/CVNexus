import { useState, useEffect } from "react";
import SectionHeader from "../shared/SectionHeader";
import { validateWordCount } from "../../utils/validation";
import { improveText } from "../../../lib/api/ai";
import { cleanText } from "../../../lib/utils/cleanText";

export default function Summary({ value, onChange, errors = [] }) {
  const [validation, setValidation] = useState({ valid: true, error: "", count: 0 });
  const [loading, setLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [previous, setPrevious] = useState("");

  useEffect(() => {
    setValidation(validateWordCount(value, 500));
  }, [value]);

  const handleImprove = async () => {
    if (!value) return;
    setAiError("");
    try {
      setPrevious(value);
      setLoading(true);
      const improved = await improveText(value, "summary");
      onChange(cleanText(improved));
    } catch (err) {
      setAiError(err?.response?.status === 429 ? "AI quota exceeded." : "AI failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-12 animate-in fade-in duration-500">
      <SectionHeader title="Professional Summary" subtitle="Your elevator pitch in 2-3 sentences." />
      <div className="relative group mt-6">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          spellCheck={true}
          autoCorrect="on"
          autoCapitalize="sentences"
          className="w-full bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 leading-relaxed focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-sm"
          placeholder="I am a dedicated professional with..."
        />
        <p className="text-xs text-slate-400 mt-2">
          Tip: Right-click underlined words to fix spelling
        </p>
        <div className="flex items-center justify-between mt-3 px-1">
          <div className="flex items-center gap-2">
            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${validation.count > 500 ? 'bg-red-500' : 'bg-blue-500'}`}
                style={{ width: `${Math.min((validation.count / 500) * 100, 100)}%` }}
              />
            </div>
            <span className={`text-[10px] font-bold tracking-tighter ${validation.count > 500 ? 'text-red-500' : 'text-slate-400'}`}>
              {validation.count}/500
            </span>
          </div>
          <div className="flex gap-2">
            {previous && (
              <button onClick={() => onChange(previous)} className="text-xs font-semibold text-slate-500 px-3 py-1 hover:text-slate-800 transition-colors">Undo</button>
            )}
            <button
              onClick={handleImprove}
              disabled={loading || !value}
              className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 text-xs font-bold rounded-full hover:bg-slate-800 disabled:opacity-30 transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
              {loading ? "Refining..." : "✨ Refine with AI"}
            </button>
          </div>
        </div>
      </div>
      {aiError && <p className="text-xs text-red-500 mt-2 ml-1">{aiError}</p>}
      {errors.slice(0, 3).map((error, index) => (
        <p key={`${error}-${index}`} className="text-xs text-red-500 mt-1 ml-1">
          {error}
        </p>
      ))}
    </section>
  );
}