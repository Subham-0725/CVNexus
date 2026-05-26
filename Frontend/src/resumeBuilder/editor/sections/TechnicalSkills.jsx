import SectionHeader from "../shared/SectionHeader";
import RepeatableList from "../shared/RepeatableList";

export default function TechnicalSkills({ value = [], onChange, errors = [] }) {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <SectionHeader title="Technical Skills" subtitle="The tools and technologies you master." />
      <div className="mt-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <RepeatableList
          items={value}
          onChange={onChange}
          placeholder="Type skill and press Enter..."
        />
        <div className="mt-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Pro Tip: Include 5-10 core keywords for ATS optimization</p>
        </div>
        {errors.slice(0, 3).map((error, index) => (
          <p key={`${error}-${index}`} className="text-xs text-red-500 mt-2">
            {error}
          </p>
        ))}
      </div>
    </section>
  );
}