import { Link } from 'react-router-dom'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-sm text-slate-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="font-semibold tracking-[0.2em] text-blue-400">NIKHIL TYAGI</p>
          <p className="mt-2">Software Engineer / Backend Developer</p>
        </div>

        <div className="flex gap-4 text-lg text-slate-300">
          <a href="https://github.com/NikhilTyagigg" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-white"><FiGithub /></a>
          <a href="https://www.linkedin.com/in/nikhil-tyagi-6040b6216/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-white"><FiLinkedin /></a>
          <a href="mailto:placeholder@email.com" aria-label="Email" className="hover:text-white"><FiMail /></a>
        </div>

        <div className="flex gap-4">
          <Link to="/projects" className="hover:text-white">Projects</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
          <Link to="/admin" className="hover:text-white">Admin</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
