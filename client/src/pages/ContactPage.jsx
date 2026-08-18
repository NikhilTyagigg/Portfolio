function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl py-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Contact</p>
        <h2 className="mt-3 text-3xl font-bold text-white">Let&apos;s build something meaningful</h2>

        <form className="mt-8 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <input className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500" type="text" placeholder="Name" />
            <input className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500" type="email" placeholder="Email" />
          </div>
          <input className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500" type="text" placeholder="Subject" />
          <textarea className="min-h-[160px] w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500" placeholder="Message" />
          <button className="rounded-full bg-gradient-to-r from-blue-500 to-violet-600 px-6 py-3 font-semibold text-white">Send Message</button>
        </form>
      </div>
    </div>
  )
}

export default ContactPage
