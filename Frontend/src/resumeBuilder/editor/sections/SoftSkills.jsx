import SectionHeader from "../shared/SectionHeader";
import RepeatableList from "../shared/RepeatableList";

export default function SoftSkills({ value = [], onChange }) {
  return (
    <section>
      <SectionHeader title="Soft Skills" />
      <RepeatableList
        items={value}
        onChange={onChange}
        placeholder="e.g. Communication, Leadership"
      />
    </section>
  );
}
