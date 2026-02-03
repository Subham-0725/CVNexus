// src/resumeBuilder/templates/ExecutiveClean.jsx
export default function ExecutiveClean({ data }) {
  const {
    personalInfo = {},
    summary,
    workExperience = [],
    education = [],
  } = data;

  return (
    <div className="p-14 font-sans text-slate-900">
      <header className="mb-12">
        <h1 className="text-5xl font-light">{personalInfo.fullName}</h1>
        <p className="text-xl text-slate-600">{personalInfo.headline}</p>
      </header>

      {summary && (
        <section className="mb-10">
          <h2 className="font-semibold mb-3">Executive Summary</h2>
          <p>{summary}</p>
        </section>
      )}

      <section className="mb-10">
        <h2 className="font-semibold mb-4">Professional Experience</h2>
        {workExperience.map((job) => (
          <div key={job.id} className="mb-6">
            <strong>{job.role}</strong>, {job.company}
            <p className="mt-2">{job.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="font-semibold mb-4">Education</h2>
        {education.map((edu) => (
          <div key={edu.id}>
            {edu.degree} — {edu.institution}
          </div>
        ))}
      </section>
    </div>
  );
}
