import SectionHeader from "../shared/SectionHeader";
import RepeatableList from "../shared/RepeatableList";

export default function Achievements({ value = [], onChange }) {
  return (
    <section>
      <SectionHeader title="Achievements" />
      <RepeatableList
        items={value}
        onChange={onChange}
        placeholder="e.g. Awarded Employee of the Year"
      />
    </section>
  );
}
