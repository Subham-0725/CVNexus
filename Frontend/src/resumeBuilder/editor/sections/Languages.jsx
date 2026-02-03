import SectionHeader from "../shared/SectionHeader";
import RepeatableList from "../shared/RepeatableList";

export default function Languages({ value = [], onChange }) {
  return (
    <section>
      <SectionHeader title="Languages" />
      <RepeatableList
        items={value}
        onChange={onChange}
        placeholder="e.g. English, Spanish"
      />
    </section>
  );
}
