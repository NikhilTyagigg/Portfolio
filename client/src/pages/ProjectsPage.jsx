const projects = [
  {
    title: 'Razorpay Clone',
    category: 'Full Stack',
    description: 'A payment gateway-inspired full stack application with secure transactions, wallet flows, and dashboard monitoring.',
    stack: ['Java', 'Spring Boot', 'React', 'MongoDB'],
    github: '#',
    demo: '#'
  },
  {
    title: 'Banking Application',
    category: 'Java',
    description: 'A banking system featuring user authentication, account management, transfers, and secure transactional records.',
    stack: ['Java', 'Spring Boot', 'SQL'],
    github: '#',
    demo: '#'
  },
  {
    title: 'Spending Tracker',
    category: 'React',
    description: 'A personal finance app that tracks budgets, recurring costs, savings, and spending patterns with rich analytics.',
    stack: ['React', 'MongoDB', 'Node.js'],
    github: '#',
    demo: '#'
  },
  {
    title: 'Library Management System',
    category: 'Full Stack',
    description: 'A digital library that manages books, issuance history, user records, and membership workflows.',
    stack: ['Java', 'Spring Boot', 'React'],
    github: '#',
    demo: '#'
  },
  {
    title: 'Blockchain Data Marketplace',
    category: 'Java',
    description: 'A blockchain-backed marketplace concept for secure data exchange, tokenized access, and transaction visibility.',
    stack: ['Java', 'Spring Boot', 'BigQuery', 'Docker'],
    github: '#',
    demo: '#'
  },
  {
    title: 'American Express Projects',
    category: 'Spring Boot',
    description: 'Enterprise-like backend improvements and financial feature work focused on performance, reliability, and maintainability.',
    stack: ['Java', 'Spring Boot', 'SQL', 'Kubernetes'],
    github: '#',
    demo: '#'
  }
]

const filters = ['All', 'Java', 'Spring Boot', 'React', 'Full Stack']

function ProjectsPage() {
  return (
    <div className="space-y-8 py-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Projects</p>
        <h2 className="mt-4 text-3xl font-bold text-white">Selected work</h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button key={filter} className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 transition hover:border-blue-500 hover:text-blue-300">
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article key={project.title} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70">
            <div className="h-48 bg-gradient-to-br from-blue-600/30 via-violet-600/25 to-slate-900 p-6">
              <div className="flex h-full items-end justify-between">
                <div>
                  <div className="rounded-full bg-slate-950/40 px-2 py-1 text-xs uppercase tracking-[0.2em] text-blue-200">{project.category}</div>
                  <h3 className="mt-3 text-2xl font-bold text-white">{project.title}</h3>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-slate-300">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-200">{item}</span>
                ))}
              </div>
              <div className="mt-5 flex gap-3">
                <a href={project.github} className="rounded-full bg-blue-500 px-3 py-2 text-sm font-medium text-white">GitHub</a>
                <a href={project.demo} className="rounded-full border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200">Live Demo</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default ProjectsPage
