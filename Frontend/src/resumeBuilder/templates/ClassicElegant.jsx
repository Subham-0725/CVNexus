// src/resumeBuilder/templates/ClassicElegant.jsx
export default function ClassicElegant({ data }) {
  const {
    personalInfo = {},
    summary,
    workExperience = [],
    education = [],
    technicalSkills = [],
  } = data;

  return (
    <div className="p-12 font-serif text-slate-900">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">{personalInfo.fullName}</h1>
        <p className="mt-2 text-slate-600">{personalInfo.headline}</p>
        <p className="text-sm mt-3">
          {personalInfo.email} · {personalInfo.phone} · {personalInfo.location}
        </p>
      </header>

      {summary && (
        <section className="mb-8">
          <h2 className="font-bold border-b mb-3">Summary</h2>
          <p>{summary}</p>
        </section>
      )}

      <section className="mb-8">
        <h2 className="font-bold border-b mb-3">Experience</h2>
        {workExperience.map((job) => (
          <div key={job.id} className="mb-5">
            <strong>{job.role}</strong> — {job.company}
            <div className="text-sm text-slate-600">
              {job.startDate} – {job.endDate}
            </div>
            <p className="mt-1">{job.description}</p>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="font-bold border-b mb-3">Education</h2>
        {education.map((edu) => (
          <div key={edu.id} className="mb-3">
            <strong>{edu.degree}</strong> — {edu.institution}
            <div className="text-sm text-slate-600">{edu.year}</div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="font-bold border-b mb-3">Skills</h2>
        <p>{technicalSkills.join(", ")}</p>
      </section>
    </div>
  );
}
