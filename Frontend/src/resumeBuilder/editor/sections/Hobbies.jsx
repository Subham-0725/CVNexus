import SectionHeader from "../shared/SectionHeader";
import RepeatableList from "../shared/RepeatableList";

export default function Hobbies({ value = [], onChange }) {
  return (
    <section>
      <SectionHeader title="Hobbies" />
      <RepeatableList
        items={value}
        onChange={onChange}
        placeholder="e.g. Photography, Chess"
      />
    </section>
  );
}
