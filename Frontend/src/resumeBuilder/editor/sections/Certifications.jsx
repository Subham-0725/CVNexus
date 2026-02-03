import SectionHeader from "../shared/SectionHeader";
import RepeatableList from "../shared/RepeatableList";

export default function Certifications({ value = [], onChange }) {
  return (
    <section>
      <SectionHeader title="Certifications" />
      <RepeatableList
        items={value}
        onChange={onChange}
        placeholder="e.g. AWS Certified Developer"
      />
    </section>
  );
}
