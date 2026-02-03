// src/resumeBuilder/editor/sections/TechnicalSkills.jsx
import SectionHeader from "../shared/SectionHeader";
import RepeatableList from "../shared/RepeatableList";

export default function TechnicalSkills({ value = [], onChange }) {
  return (
    <section>
      <SectionHeader title="Technical Skills" />
      <RepeatableList
        items={value}
        onChange={onChange}
        placeholder="e.g. React, Node.js, MongoDB"
      />
    </section>
  );
}
