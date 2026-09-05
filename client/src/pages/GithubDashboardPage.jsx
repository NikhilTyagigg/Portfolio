import { useEffect, useState } from 'react'
import axios from 'axios'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts'

const pieColors = ['#3B82F6', '#8B5CF6', '#22C55E', '#F59E0B', '#EF4444']

function GithubDashboardPage() {
  const [data, setData] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
        const response = await axios.get(`${apiBase}/github/overview`)
        if (!response.data?.stats) {
          throw new Error('GitHub API returned an unexpected response')
        }
        setData(response.data)
      } catch (error) {
        console.error('Failed to fetch GitHub data', error)
        setErrorMessage(error.response?.data?.message || 'GitHub data is temporarily unavailable.')
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  if (loading) {
    return <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-slate-300">Loading GitHub dashboard...</div>
  }

  if (!data) {
    return <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-red-300">{errorMessage || 'Unable to load GitHub data right now.'}</div>
  }

  const metricData = [
    { name: 'Repositories', value: data.stats.repositories },
    { name: 'Followers', value: data.stats.followers },
    { name: 'Following', value: data.stats.following },
    { name: 'Stars', value: data.stats.starsEarned },
    { name: 'Pull Requests', value: data.stats.pullRequests }
  ]

  const contributionData = data.weeklyActivity || []
  const monthlyData = data.monthlyActivity || []

  return (
    <div className="space-y-8 py-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">GitHub Activity</p>
        <h2 className="mt-4 text-3xl font-bold text-white">Developer score dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          { label: 'Total Repositories', value: data.stats.repositories },
          { label: 'Followers', value: data.stats.followers },
          { label: 'Following', value: data.stats.following },
          { label: 'Stars Earned', value: data.stats.starsEarned },
          { label: 'Developer Score', value: data.stats.developerScore.toLocaleString() }
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="text-3xl font-black text-white">{item.value}</div>
            <div className="mt-2 text-sm text-slate-300">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="text-xl font-bold text-white">Contribution breakdown</h3>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={metricData} dataKey="value" innerRadius={50} outerRadius={90} paddingAngle={5}>
                  {metricData.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="text-xl font-bold text-white">Weekly activity</h3>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={contributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip />
                <Line type="monotone" dataKey="commits" stroke="#3B82F6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="text-xl font-bold text-white">Latest commits</h3>
          <div className="mt-5 space-y-4">
            {(data.latestCommits || []).slice(0, 5).map((entry, index) => (
              <div key={`${entry.repository}-${index}`} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold text-white">{entry.repository}</div>
                  <div className="text-xs text-slate-400">{entry.branch}</div>
                </div>
                <div className="mt-2 text-sm text-slate-300">{entry.message}</div>
                <div className="mt-2 text-xs text-slate-500">{entry.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="text-xl font-bold text-white">Recent repositories</h3>
          <div className="mt-5 space-y-4">
            {(data.recentRepositories || []).map((repo) => (
              <div key={repo.name} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold text-white">{repo.name}</div>
                  <div className="text-xs text-slate-400">⭐ {repo.stars}</div>
                </div>
                <div className="mt-2 text-sm text-slate-300">{repo.description}</div>
                <div className="mt-2 text-xs text-blue-300">{repo.language}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <h3 className="text-xl font-bold text-white">Monthly contributions</h3>
        <div className="mt-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip />
              <Bar dataKey="value" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default GithubDashboardPage
