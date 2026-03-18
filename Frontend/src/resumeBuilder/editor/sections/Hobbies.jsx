import SectionHeader from "../shared/SectionHeader";
import RepeatableList from "../shared/RepeatableList";

export default function Hobbies({ value = [], onChange }) {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <SectionHeader
        title="Interests & Hobbies"
        subtitle="What drives you outside of your professional life?"
      />
      <div className="mt-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
        <RepeatableList
          items={value}
          onChange={onChange}
          placeholder="e.g. Landscape Photography, Open Source Contributing"
        />
        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-[11px] text-slate-500 leading-relaxed">
            <span className="font-bold text-slate-700">Note:</span> Hobbies are a great way to show culture fit and personality to potential employers.
          </p>
        </div>
      </div>
    </section>
  );
}