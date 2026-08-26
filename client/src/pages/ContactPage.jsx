import { useState } from 'react'
import axios from 'axios'

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', text: '' })
  const [isSending, setIsSending] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: '', text: '' })
    setIsSending(true)

    try {
      await axios.post(`${apiBase}/contact`, formData)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setStatus({ type: 'success', text: 'Message sent successfully.' })
    } catch (error) {
      setStatus({
        type: 'error',
        text: error.response?.data?.message || 'Unable to send your message. Please try again.'
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl py-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Contact</p>
        <h2 className="mt-3 text-3xl font-bold text-white">Let&apos;s build something meaningful</h2>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <input name="name" value={formData.name} onChange={handleChange} required className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500" type="text" placeholder="Name" />
            <input name="email" value={formData.email} onChange={handleChange} required className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500" type="email" placeholder="Email" />
          </div>
          <input name="subject" value={formData.subject} onChange={handleChange} required className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500" type="text" placeholder="Subject" />
          <textarea name="message" value={formData.message} onChange={handleChange} required className="min-h-[160px] w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500" placeholder="Message" />
          <button disabled={isSending} className="rounded-full bg-gradient-to-r from-blue-500 to-violet-600 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">{isSending ? 'Sending...' : 'Send Message'}</button>
          {status.text && <p className={status.type === 'success' ? 'text-sm text-emerald-400' : 'text-sm text-red-400'}>{status.text}</p>}
        </form>
      </div>
    </div>
  )
}

export default ContactPage
