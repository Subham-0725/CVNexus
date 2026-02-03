// src/resumeBuilder/templates/ModernATS.jsx
export default function ModernATS({ data }) {
  const { personalInfo = {}, summary, workExperience = [] } = data;

  return (
    <div className="p-12 font-sans text-slate-800">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">{personalInfo.fullName}</h1>
        <p className="text-lg text-slate-600">{personalInfo.headline}</p>
      </header>

      {summary && (
        <section className="mb-8">
          <h2 className="uppercase tracking-wide font-semibold mb-2">
            About Me
          </h2>
          <p>{summary}</p>
        </section>
      )}

      <section>
        <h2 className="uppercase tracking-wide font-semibold mb-4">
          Work Experience
        </h2>
        {workExperience.map((job) => (
          <div key={job.id} className="mb-6">
            <strong>{job.role}</strong> — {job.company}
            <div className="text-sm text-slate-500">
              {job.startDate} – {job.endDate}
            </div>
            <p className="mt-2">{job.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
