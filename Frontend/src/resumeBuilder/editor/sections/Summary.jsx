// src/resumeBuilder/editor/sections/Summary.jsx
import SectionHeader from "../shared/SectionHeader";
import TextArea from "../shared/TextArea";

export default function Summary({ value, onChange }) {
  return (
    <section>
      <SectionHeader title="Professional Summary" />
      <TextArea
        value={value}
        onChange={onChange}
        placeholder="Brief professional summary"
      />
    </section>
  );
}
