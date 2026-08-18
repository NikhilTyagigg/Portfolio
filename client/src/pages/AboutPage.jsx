const highlights = [
  'Career Summary',
  'Technical Interests',
  'Current Learning Goals',
  'Achievements',
  'Certifications'
]

const journey = [
  { year: '2019', title: 'B.Tech in Computer Science', detail: 'Started a strong foundation in software engineering, data structures, computer networks and backend architecture.' },
  { year: '2022', title: 'Software Engineer Intern', detail: 'Built and optimized backend services, integrated APIs, and collaborated on production-grade engineering workflows.' },
  { year: '2023', title: 'Backend Developer', detail: 'Delivered end-to-end features across Java, Spring Boot, messaging systems, and cloud deployment pipelines.' },
  { year: '2025', title: 'Cloud + DevOps Focus', detail: 'Expanded into Kubernetes, Terraform, ArgoCD, GKE, and scalable platform engineering.' }
]

function AboutPage() {
  return (
    <div className="space-y-10 py-8">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">About Me</p>
          <h2 className="mt-4 text-3xl font-bold text-white">Backend-focused engineer building scalable digital products.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            I am a software engineer with a passion for backend systems, distributed services, cloud platforms, and clean engineering workflows. My work focuses on building high-impact solutions that combine user experience, performance, and maintainability.
          </p>
          <p className="mt-4 text-slate-300">
            I enjoy solving complex infrastructure and product challenges using Java, Spring Boot, SQL, MongoDB, Docker, Kubernetes, and modern CI/CD practices. I also value writing clear code, shipping reliable features, and continuously learning.
          </p>
        </div>

        <div className="grid gap-4">
          {highlights.map((item) => (
            <div key={item} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
        <h3 className="text-2xl font-bold text-white">Professional Journey</h3>
        <div className="mt-8 space-y-6">
          {journey.map((item) => (
            <div key={item.year} className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-3 before:w-3 before:rounded-full before:bg-blue-500 after:absolute after:left-[5px] after:top-6 after:h-[calc(100%+1.5rem)] after:w-px after:bg-slate-700">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">{item.year}</div>
              <h4 className="mt-2 text-xl font-semibold text-white">{item.title}</h4>
              <p className="mt-2 text-slate-300">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AboutPage
