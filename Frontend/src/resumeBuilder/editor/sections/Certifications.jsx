import SectionHeader from "../shared/SectionHeader";
import RepeatableList from "../shared/RepeatableList";

export default function Certifications({ value = [], onChange }) {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <SectionHeader
        title="Certifications"
        subtitle="Professional credentials and specialized training."
      />
      <div className="mt-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
        <RepeatableList
          items={value}
          onChange={onChange}
          placeholder="e.g. AWS Certified Solutions Architect"
        />
        <div className="mt-4 flex items-center gap-2">
          <div className="flex -space-x-1">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
          </div>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            Verified expertise builds recruiter trust
          </p>
        </div>
      </div>
    </section>
  );
}