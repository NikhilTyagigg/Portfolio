const highlights = [
  'Java & Spring Boot Development',
  'Data Engineering & BigQuery',
  'Cloud & Platform Engineering',
  'Backend System Design',
  'Continuous Learning'
]

const journey = [
  {
    year: '2020',
    title: 'B.Tech Computer Science - MAIT',
    detail:
      'Started my Computer Science journey at Maharaja Agrasen Institute of Technology with a strong focus on software engineering, databases, operating systems, and distributed systems.'
  },
  {
    year: '2022',
    title: 'Software Development Projects',
    detail:
      'Built multiple full-stack and backend-focused projects using Java, Spring Boot, React, MongoDB, and SQL while strengthening problem-solving and software design skills.'
  },
  {
    year: '2023',
    title: 'Software Engineer',
    detail:
      'Worked on enterprise backend applications, REST APIs, data ingestion frameworks, SQL transformations, and large-scale data processing workflows.'
  },
  {
    year: '2025',
    title: 'Cloud & Data Engineering',
    detail:
      'Expanded expertise into BigQuery, Kubernetes, Terraform, ArgoCD, GKE, CI/CD pipelines, platform engineering, and scalable cloud-native architectures.'
  }
]

function AboutPage() {
  return (
    <div className="space-y-10 py-8">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            About Me
          </p>

          <h2 className="mt-4 text-3xl font-bold text-white">
            Software Engineer focused on Backend Systems, Data Engineering &
            Cloud Platforms.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            Hi, I'm Nikhil Tyagi, a Software Engineer with a strong foundation
            in Java, Spring Boot, SQL, and modern cloud technologies. I enjoy
            designing scalable backend systems, building reliable APIs, and
            solving complex engineering challenges that create real business
            impact.
          </p>

          <p className="mt-4 text-slate-300">
            My experience includes working on enterprise-grade data ingestion
            frameworks, BigQuery-based data platforms, API integrations, and
            cloud-native applications. I am passionate about clean architecture,
            performance optimization, and building systems that are reliable,
            maintainable, and scalable.
          </p>

          <p className="mt-4 text-slate-300">
            Beyond development, I continuously explore cloud engineering,
            Kubernetes, Terraform, ArgoCD, and modern DevOps practices while
            strengthening my expertise in distributed systems and large-scale
            data processing.
          </p>
        </div>

        <div className="grid gap-4">
          {highlights.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-slate-200"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
        <h3 className="text-2xl font-bold text-white">
          Professional Journey
        </h3>

        <div className="mt-8 space-y-6">
          {journey.map((item) => (
            <div
              key={item.year}
              className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-3 before:w-3 before:rounded-full before:bg-blue-500 after:absolute after:left-[5px] after:top-6 after:h-[calc(100%+1.5rem)] after:w-px after:bg-slate-700"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                {item.year}
              </div>

              <h4 className="mt-2 text-xl font-semibold text-white">
                {item.title}
              </h4>

              <p className="mt-2 text-slate-300">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AboutPage