const skills = {
  Backend: ['Java', 'Spring Boot', 'REST APIs', 'SQL', 'MongoDB'],
  Frontend: ['React', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'],
  Database: ['MySQL', 'MongoDB', 'PostgreSQL', 'BigQuery'],
  Cloud: ['GKE', 'Google Cloud', 'Docker', 'Kubernetes'],
  DevOps: ['Terraform', 'ArgoCD', 'GitHub Actions', 'CI/CD'],
  Tools: ['GitHub', 'Docker', 'Postman', 'Jira']
}

function SkillsPage() {
  return (
    <div className="space-y-8 py-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Skills</p>
        <h2 className="mt-4 text-3xl font-bold text-white">Technology stack</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h3 className="text-xl font-bold text-white">{category}</h3>

            <div className="mt-5 space-y-4">
              {items.map((skill) => (
                <div key={skill}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                    <span>{skill}</span>
                    <span>85%</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500" style={{ width: '85%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillsPage
