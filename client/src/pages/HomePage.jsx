import { motion } from 'framer-motion'
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const stats = [
  { label: 'Projects Completed', value: '18+', suffix: '' },
  { label: 'Years of Experience', value: '2', suffix: '+' },
  { label: 'GitHub Contributions', value: '7.5K', suffix: '' },
  { label: 'Technologies Used', value: '12', suffix: '' }
]

const roles = ['Backend Developer', 'Software Engineer', 'Java Developer', 'Cloud Engineer']

function HomePage() {
  return (
    <div className="space-y-20 pb-16">
      <section className="grid items-center gap-10 py-10 md:grid-cols-[1.2fr_0.8fr]">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Available for opportunities
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Nikhil Tyagi
          </h1>

          <div className="mt-4 flex min-h-[3rem] items-center text-xl text-slate-300 sm:text-2xl">
            <span className="mr-2 font-medium text-blue-400">I am a</span>
            <span className="font-semibold text-violet-400">{roles[0]}</span>
          </div>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Software engineer focused on building scalable backend systems, cloud-native products, and data-driven experiences using Java, Spring Boot, React, and modern DevOps tooling.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/resume" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 px-5 py-3 font-semibold text-white shadow-glow transition hover:opacity-90">
              <FiDownload /> Download Resume
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-5 py-3 font-semibold text-slate-100 transition hover:border-blue-500 hover:text-blue-300">
              Contact Me <FiArrowRight />
            </Link>
            <Link to="/projects" className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-5 py-3 font-semibold text-slate-100 transition hover:border-violet-500 hover:text-violet-300">
              View Projects
            </Link>
          </div>

          <div className="mt-8 flex gap-5 text-2xl text-slate-300">
            <a href="https://github.com/NikhilTyagigg" target="_blank" rel="noreferrer" className="hover:text-white"><FiGithub /></a>
            <a href="https://www.linkedin.com/in/nikhil-tyagi-6040b6216/" target="_blank" rel="noreferrer" className="hover:text-white"><FiLinkedin /></a>
            <a href="mailto:placeholder@email.com" className="hover:text-white"><FiMail /></a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="relative">
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-blue-600/25 to-violet-600/20 blur-2xl" />
          <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900 p-4 shadow-2xl">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900 p-6">
              <div className="mb-6 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 font-black text-2xl text-white">
                  NT
                </div>
                <div>
                  <div className="text-xl font-bold text-white">Nikhil Tyagi</div>
                  <div className="text-sm text-slate-400">Senior Software Engineer</div>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-blue-300">
                    <span>Java</span>
                    <span>Spring</span>
                    <span>React</span>
                    <span>GKE</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {['Java', 'SQL', 'MongoDB', 'Terraform'].map((skill) => (
                  <div key={skill} className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-center text-sm font-medium text-slate-200">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg"
          >
            <div className="text-3xl font-black text-white">{stat.value}<span className="text-blue-400">{stat.suffix}</span></div>
            <div className="mt-2 text-sm text-slate-300">{stat.label}</div>
          </motion.div>
        ))}
      </section>
    </div>
  )
}

export default HomePage
