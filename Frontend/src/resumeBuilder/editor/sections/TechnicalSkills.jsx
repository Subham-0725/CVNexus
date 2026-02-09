import SectionHeader from "../shared/SectionHeader";
import RepeatableList from "../shared/RepeatableList";

export default function TechnicalSkills({ value = [], onChange }) {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <SectionHeader
        title="Technical Skills"
        subtitle="Hard skills, tools, and frameworks."
      />
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-inner">
        <RepeatableList
          items={value}
          onChange={onChange}
          placeholder="e.g. React, Node.js, Python, Figma"
        />
      </div>
    </section>
  );
}
