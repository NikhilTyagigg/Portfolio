import { useEffect, useState } from 'react'
import axios from 'axios'

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function ResumePage() {
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(`${apiBase}/resume`)
        const latestResume = response.data[0] || null
        setResume(latestResume)
      } catch (error) {
        console.error('Failed to fetch resume:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchResume()
  }, [])

  const resumeUrl = resume ? `http://localhost:5000${resume.fileUrl}` : ''

  return (
    <div className="space-y-8 py-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Resume</p>
        <h2 className="mt-4 text-3xl font-bold text-white">Professional profile</h2>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        {resume ? (
          <>
            <div className="mb-6 flex flex-wrap gap-3">
              <a href={resumeUrl} target="_blank" rel="noreferrer" className="rounded-full bg-blue-500 px-4 py-2 font-medium text-white">
                View Resume
              </a>
              <a href={resumeUrl} download className="rounded-full border border-slate-700 px-4 py-2 font-medium text-slate-200">
                Download Resume
              </a>
              <button onClick={() => window.print()} className="rounded-full border border-slate-700 px-4 py-2 font-medium text-slate-200">
                Print Resume
              </button>
            </div>

            <div className="h-[700px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
              {resume.fileUrl?.toLowerCase().endsWith('.pdf') ? (
                <iframe src={resumeUrl} title="Resume preview" className="h-full w-full" />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400">
                  <a href={resumeUrl} target="_blank" rel="noreferrer" className="text-blue-400 underline">
                    Open resume file
                  </a>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 text-center text-slate-400">
            {loading ? 'Loading resume...' : 'No resume uploaded yet. Use the admin panel to upload one.'}
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumePage
