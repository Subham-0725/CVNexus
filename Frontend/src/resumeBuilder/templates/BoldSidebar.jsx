// src/resumeBuilder/templates/BoldSidebar.jsx
export default function BoldSidebar({ data }) {
  const {
    personalInfo = {},
    technicalSkills = [],
    languages = [],
    workExperience = [],
  } = data;

  return (
    <div className="grid grid-cols-3 min-h-[297mm] font-sans">
      <aside className="col-span-1 bg-indigo-700 text-white p-6">
        <h1 className="text-2xl font-bold mb-2">{personalInfo.fullName}</h1>
        <p className="text-sm mb-6">{personalInfo.headline}</p>

        <section className="mb-6">
          <h3 className="font-semibold mb-2">Skills</h3>
          <ul className="text-sm space-y-1">
            {technicalSkills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="font-semibold mb-2">Languages</h3>
          <ul className="text-sm space-y-1">
            {languages.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </section>
      </aside>

      <main className="col-span-2 p-8">
        <h2 className="text-xl font-bold mb-4">Work Experience</h2>
        {workExperience.map((job) => (
          <div key={job.id} className="mb-6">
            <strong>{job.role}</strong> — {job.company}
            <p className="mt-1">{job.description}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
