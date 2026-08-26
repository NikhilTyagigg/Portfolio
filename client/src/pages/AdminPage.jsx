import { useState } from 'react'
import axios from 'axios'

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function AdminPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(localStorage.getItem('portfolio-admin-token') || '')
  const [status, setStatus] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  const login = async (event) => {
    event.preventDefault()
    setStatus('Logging in...')

    try {
      const response = await axios.post(`${apiBase}/auth/login`, { email, password })
      localStorage.setItem('portfolio-admin-token', response.data.token)
      setToken(response.data.token)
      setStatus('Login successful. You can upload the resume now.')
    } catch (error) {
      setStatus(error.response?.data?.message || 'Login failed')
    }
  }

  const uploadResume = async (event) => {
    event.preventDefault()

    if (!selectedFile) {
      setStatus('Please choose a PDF or resume file first.')
      return
    }

    const formData = new FormData()
    formData.append('resume', selectedFile)
    formData.append('title', 'Nikhil Tyagi Resume')

    try {
      const response = await axios.post(`${apiBase}/resume/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      setStatus(`Resume uploaded successfully: ${response.data.resume.fileName}`)
    } catch (error) {
      setStatus(error.response?.data?.message || 'Resume upload failed')
    }
  }

  return (
    <div className="space-y-8 py-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Admin</p>
        <h2 className="mt-3 text-3xl font-bold text-white">Protected dashboard</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Total Visitors', value: 12840 },
            { label: 'Total Messages', value: 74 },
            { label: 'GitHub Score', value: 8420 },
            { label: 'Project Views', value: 3920 }
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <div className="text-3xl font-black text-white">{item.value}</div>
              <div className="mt-2 text-sm text-slate-300">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <form onSubmit={login} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <h3 className="text-xl font-bold text-white">Admin Login</h3>
            <div className="mt-4 space-y-4">
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-slate-100 outline-none focus:border-blue-500"
                placeholder="Email"
                autoComplete="username"
                required
              />
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-slate-100 outline-none focus:border-blue-500"
                placeholder="Password"
                autoComplete="current-password"
                required
              />
              <button className="rounded-full bg-blue-500 px-4 py-2 font-medium text-white">Login</button>
            </div>
          </form>

          <form onSubmit={uploadResume} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <h3 className="text-xl font-bold text-white">Upload Resume</h3>
            <div className="mt-4 space-y-4">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full rounded-xl border border-dashed border-slate-700 bg-slate-900 p-3 text-slate-200"
              />
              <button className="rounded-full bg-violet-500 px-4 py-2 font-medium text-white">Upload Resume</button>
            </div>
          </form>
        </div>

        {status && <div className="mt-6 rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 text-sm text-blue-200">{status}</div>}
      </div>
    </div>
  )
}

export default AdminPage
