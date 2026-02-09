import SectionHeader from "../shared/SectionHeader";
import RepeatableList from "../shared/RepeatableList";

export default function Languages({ value = [], onChange }) {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <SectionHeader title="Languages" subtitle="Communication skills." />
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-inner">
        <RepeatableList
          items={value}
          onChange={onChange}
          placeholder="e.g. Spanish (Fluent), German (Basic)"
        />
      </div>
    </section>
  );
}
