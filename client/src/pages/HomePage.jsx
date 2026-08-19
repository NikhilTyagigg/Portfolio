import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const stats = [
  { label: 'Projects Completed', value: '18+', suffix: '' },
  { label: 'Years of Experience', value: '2', suffix: '+' },
  { label: 'GitHub Contributions', value: '7.5K', suffix: '' },
  { label: 'Technologies Used', value: '12', suffix: '' }
]

const roles = ['Backend Developer', 'Software Engineer', 'Java Developer', 'Cloud Engineer']

function HomePage() {
  const [activeLayer, setActiveLayer] = useState('orbit')
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [8, -8]), { stiffness: 140, damping: 18 })
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-10, 10]), { stiffness: 140, damping: 18 })

  const handleSceneMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5)
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5)
  }

  const resetScene = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

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
          <div className="scene-aura" />
          <div className="scene-stage" onMouseMove={handleSceneMove} onMouseLeave={resetScene}>
            <motion.div className="scene-world" style={{ rotateX, rotateY }}>
              <div className="scene-grid" />
              <motion.div className="scene-orbit scene-orbit-one" animate={activeLayer === 'orbit' ? { rotateZ: 360 } : { rotateZ: 0 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} />
              <motion.div className="scene-orbit scene-orbit-two" animate={{ rotateZ: -360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} />
              <motion.div className="scene-core" whileHover={{ scale: 1.08 }}>
                <span>NT</span>
                <small>BUILD / SHIP / SCALE</small>
              </motion.div>
              <div className="scene-node scene-node-java">JAVA</div>
              <div className="scene-node scene-node-cloud">CLOUD</div>
              <div className="scene-node scene-node-data">DATA</div>
              <div className="scene-panel scene-panel-top">SYSTEMS <strong>01</strong></div>
              <div className="scene-panel scene-panel-bottom">AVAILABLE <strong>NOW</strong></div>
            </motion.div>
            <div className="scene-label">INTERACTIVE / 3D PROFILE</div>
          </div>
          <div className="mt-4 flex items-center justify-between px-2 text-xs uppercase tracking-[0.18em] text-slate-500">
            <span>Move to explore</span>
            <button type="button" onClick={() => setActiveLayer(activeLayer === 'orbit' ? 'still' : 'orbit')} className="text-blue-300 transition hover:text-white">
              {activeLayer === 'orbit' ? 'Pause orbit' : 'Resume orbit'}
            </button>
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
