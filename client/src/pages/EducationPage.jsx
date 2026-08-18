const education = [
  {
    type: 'B.Tech Computer Science',
    institution: 'Maharaja Agrasen Institute of Technology',
    duration: '2020 - 2024',
    cgpa: '8.4 CGPA',
    details: ['Academic excellence with focus on software engineering and distributed systems.', 'Relevant coursework: Data Structures, DBMS, OOP, OS, Computer Networks, Cloud Computing.']
  },
  {
    type: '12th Class',
    institution: 'Salwan Public School',
    duration: '2019 - 2020',
    cgpa: '88.60%',
    details: ['Strong performance in mathematics and computer science subjects.', 'Hands-on work with programming fundamentals and analytical problem solving.']
  },
{
  type: '10th Class',
  institution: 'Konark VidyaPeeth School',
  duration: '2018 - 2019',
  cgpa: '80.0%',
  details: [
    'Strong academic foundation.',
    'Developed interest in mathematics and technology.'
  ]
}
]

function EducationPage() {
  return (
    <div className="space-y-8 py-8">
      <div className="mb-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Education</p>
        <h2 className="mt-4 text-3xl font-bold text-white">Academic background</h2>
      </div>

      <div className="space-y-6">
        {education.map((item) => (
          <div key={item.type} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">{item.type}</div>
                <h3 className="mt-2 text-2xl font-bold text-white">{item.institution}</h3>
              </div>
              <div className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-sm text-slate-200">{item.duration}</div>
            </div>

            <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-300">
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-blue-300">{item.cgpa}</span>
              <span className="rounded-full bg-violet-500/10 px-3 py-1 text-violet-300">Achievements</span>
              <span className="rounded-full bg-slate-800 px-3 py-1">Relevant Coursework</span>
            </div>

            <ul className="mt-5 list-disc space-y-2 pl-5 text-slate-300">
              {item.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EducationPage
