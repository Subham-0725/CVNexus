import { useState, useEffect } from "react";
import SectionHeader from "../shared/SectionHeader";
import TextInput from "../shared/TextInput";
import { validateEmail, validatePhone, validateURL } from "../../utils/validation";

export default function PersonalInfo({ value = {}, onChange }) {
  const [errors, setErrors] = useState({});

  const update = (key, val) => {
    onChange({ ...value, [key]: val });
  };

  useEffect(() => {
    const newErrors = {};
    if (value.email && !validateEmail(value.email).valid)
      newErrors.email = validateEmail(value.email).error;
    if (value.phone && !validatePhone(value.phone).valid)
      newErrors.phone = validatePhone(value.phone).error;
    if (value.linkedin && !validateURL(value.linkedin).valid)
      newErrors.linkedin = validateURL(value.linkedin).error;
    setErrors(newErrors);
  }, [value.email, value.phone, value.linkedin]);

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SectionHeader
        title="Identity & Contact"
        subtitle="This is how recruiters will find you. Keep it professional."
      />

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-6">
        <div className="space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-slate-100"></div>
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">Core Identity</h3>
              <div className="h-px flex-1 bg-slate-100"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <TextInput
                label="Full Name"
                value={value.fullName}
                onChange={(v) => update("fullName", v)}
                placeholder="Jane Doe"
                className="text-lg font-medium"
              />
              <TextInput
                label="Headline"
                value={value.headline}
                onChange={(v) => update("headline", v)}
                placeholder="Senior Product Designer"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-slate-100"></div>
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">Contact Channels</h3>
              <div className="h-px flex-1 bg-slate-100"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              <TextInput
                label="Email Address"
                type="email"
                value={value.email}
                onChange={(v) => update("email", v)}
                error={errors.email}
                icon={<span className="text-slate-400">@</span>}
              />
              <TextInput
                label="Phone Number"
                value={value.phone}
                onChange={(v) => update("phone", v)}
                placeholder="+1 (555) 000-0000"
                error={errors.phone}
              />
              <TextInput
                label="Location"
                value={value.location}
                onChange={(v) => update("location", v)}
                placeholder="City, Country"
              />
              <TextInput
                label="LinkedIn / Portfolio"
                value={value.linkedin}
                onChange={(v) => update("linkedin", v)}
                placeholder="linkedin.com/in/jane"
                error={errors.linkedin}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}