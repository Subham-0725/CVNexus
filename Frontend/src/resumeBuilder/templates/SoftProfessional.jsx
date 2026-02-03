// src/resumeBuilder/templates/SoftProfessional.jsx
export default function SoftProfessional({ data }) {
  const {
    personalInfo = {},
    summary,
    workExperience = [],
    education = [],
    technicalSkills = [],
  } = data;

  return (
    <div className="p-10 font-sans text-slate-800">
      <header className="mb-8">
        <h1 className="text-4xl font-semibold">{personalInfo.fullName}</h1>
        <p className="text-slate-500">{personalInfo.headline}</p>
      </header>

      <div className="grid grid-cols-3 gap-8">
        <aside className="col-span-1">
          <section className="mb-6">
            <h3 className="font-semibold mb-2">Skills</h3>
            <ul className="text-sm space-y-1">
              {technicalSkills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="font-semibold mb-2">Education</h3>
            {education.map((edu) => (
              <div key={edu.id} className="text-sm mb-2">
                {edu.degree}
              </div>
            ))}
          </section>
        </aside>

        <main className="col-span-2">
          {summary && (
            <section className="mb-6">
              <h2 className="font-semibold mb-2">About Me</h2>
              <p>{summary}</p>
            </section>
          )}

          <section>
            <h2 className="font-semibold mb-4">Experience</h2>
            {workExperience.map((job) => (
              <div key={job.id} className="mb-5">
                <strong>{job.role}</strong> — {job.company}
                <p className="mt-1">{job.description}</p>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
