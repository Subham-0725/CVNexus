// src/resumeBuilder/editor/sections/PersonalInfo.jsx
import SectionHeader from "../shared/SectionHeader";
import TextInput from "../shared/TextInput";

export default function PersonalInfo({ value = {}, onChange }) {
  const update = (key, val) => {
    onChange({ ...value, [key]: val });
  };

  return (
    <section>
      <SectionHeader title="Personal Information" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          label="Full Name"
          value={value.fullName}
          onChange={(v) => update("fullName", v)}
        />
        <TextInput
          label="Headline"
          value={value.headline}
          onChange={(v) => update("headline", v)}
        />
        <TextInput
          label="Email"
          type="email"
          value={value.email}
          onChange={(v) => update("email", v)}
        />
        <TextInput
          label="Phone"
          value={value.phone}
          onChange={(v) => update("phone", v)}
        />
        <TextInput
          label="Location"
          value={value.location}
          onChange={(v) => update("location", v)}
        />
        <TextInput
          label="LinkedIn"
          value={value.linkedin}
          onChange={(v) => update("linkedin", v)}
        />
      </div>
    </section>
  );
}
