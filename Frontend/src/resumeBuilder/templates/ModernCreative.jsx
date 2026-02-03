// src/resumeBuilder/templates/ModernCreative.jsx
export default function ModernCreative({ data }) {
  const {
    personalInfo = {},
    summary,
    workExperience = [],
    projects = [],
    technicalSkills = [],
  } = data;

  return (
    <div className="p-10 font-sans text-slate-800">
      <header className="mb-8">
        <h1 className="text-5xl font-bold">{personalInfo.fullName}</h1>
        <p className="text-xl text-indigo-600">{personalInfo.headline}</p>
      </header>

      {summary && (
        <section className="mb-8">
          <h2 className="uppercase tracking-wide font-semibold mb-2">
            Profile
          </h2>
          <p>{summary}</p>
        </section>
      )}

      <section className="mb-8">
        <h2 className="uppercase tracking-wide font-semibold mb-4">
          Experience
        </h2>
        {workExperience.map((job) => (
          <div key={job.id} className="mb-6">
            <strong>{job.role}</strong> · {job.company}
            <p className="mt-1">{job.description}</p>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="uppercase tracking-wide font-semibold mb-4">Projects</h2>
        {projects.map((p) => (
          <div key={p.id} className="mb-4">
            <strong>{p.title}</strong>
            <p className="text-sm">{p.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="uppercase tracking-wide font-semibold mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {technicalSkills.map((s, i) => (
            <span key={i} className="px-3 py-1 text-sm bg-slate-100 rounded">
              {s}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
