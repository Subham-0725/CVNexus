import SectionHeader from "../shared/SectionHeader";
import RepeatableList from "../shared/RepeatableList";

export default function Languages({ value = [], onChange }) {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <SectionHeader
        title="Languages"
        subtitle="Communication and linguistic capabilities."
      />
      <div className="mt-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
        <RepeatableList
          items={value}
          onChange={onChange}
          placeholder="e.g. English (Native), French (B2)"
        />
        <p className="mt-4 text-[10px] text-slate-400 italic font-medium ml-1">
          Mention your proficiency level for each language.
        </p>
      </div>
    </section>
  );
}