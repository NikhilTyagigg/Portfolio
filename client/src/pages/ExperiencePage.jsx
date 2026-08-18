const experiences = [
  {
    company: 'TCS (Contractor for American Express)',
    role: 'Software Engineer',
    duration: '2024 - Present',
    responsibilities: ['Built backend APIs and data workflows powering business-critical financial features.', 'Improved system observability and performance for low-latency services.', 'Collaborated with product and infrastructure teams to ship stable releases.'],
    tech: ['Java', 'Spring Boot', 'SQL', 'Docker', 'Kubernetes'],
    achievement: 'Reduced service latency and improved deployment reliability in production systems.'
  },
  {
    company: 'Freelance',
    role: 'Full Stack Developer',
    duration: '2023 - 2024',
    responsibilities: ['Delivered custom web solutions for clients with React, Node.js, and MongoDB.', 'Built dashboards, inventory systems, and analytics experiences for growing businesses.'],
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind'],
    achievement: 'Shipped multiple business apps with measurable UI/UX and performance improvements.'
  },
  {
    company: 'Internship Projects',
    role: 'Backend Engineer Intern',
    duration: '2022 - 2023',
    responsibilities: ['Developed APIs and data models for internship projects with strong code quality standards.', 'Worked on service design, testing, and integration with databases and frontends.'],
    tech: ['Java', 'Spring Boot', 'MongoDB', 'REST APIs'],
    achievement: 'Built production-ready project modules and improved onboarding for engineering tasks.'
  }
]

function ExperiencePage() {
  return (
    <div className="space-y-8 py-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Experience</p>
        <h2 className="mt-4 text-3xl font-bold text-white">Career timeline</h2>
      </div>

      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.company} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">{exp.company}</div>
                <h3 className="mt-2 text-2xl font-bold text-white">{exp.role}</h3>
              </div>
              <div className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-sm text-slate-200">{exp.duration}</div>
            </div>

            <ul className="mt-5 list-disc space-y-2 pl-5 text-slate-300">
              {exp.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {exp.tech.map((item) => (
                <span key={item} className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-300">{item}</span>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-violet-500/30 bg-violet-500/5 p-4 text-slate-200">
              <span className="font-semibold text-violet-300">Key Achievements:</span> {exp.achievement}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExperiencePage
