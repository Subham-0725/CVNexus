import SectionHeader from "../shared/SectionHeader";
import RepeatableList from "../shared/RepeatableList";

export default function SoftSkills({ value = [], onChange }) {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <SectionHeader
        title="Soft Skills"
        subtitle="Interpersonal attributes and leadership qualities."
      />
      <div className="mt-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
        <RepeatableList
          items={value}
          onChange={onChange}
          placeholder="e.g. Strategic Thinking, Conflict Resolution"
        />
        <div className="mt-4 flex items-center gap-2 border-t border-slate-50 pt-3">
          <svg className="w-3 h-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            Focus on skills that show how you work with others
          </p>
        </div>
      </div>
    </section>
  );
}