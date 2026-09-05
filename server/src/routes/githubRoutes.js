const express = require('express');
const axios = require('axios');

const router = express.Router();

const getGitHubHeaders = () => {
  const headers = {
    'User-Agent': 'portfolio-app',
    Accept: 'application/vnd.github+json'
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
};

const buildWeeklyActivity = (events) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const totals = Array.from({ length: 7 }, (_, index) => ({
    name: days[index],
    commits: 0
  }));

  events
    .filter((event) => event.type === 'PushEvent')
    .forEach((event) => {
      const date = new Date(event.created_at);
      const dayIndex = date.getDay();
      const commitCount = event.payload?.commits?.length || 0;
      totals[(dayIndex + 1) % 7].commits += commitCount;
    });

  return totals;
};

const buildMonthlyActivity = (events) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const totals = monthNames.map((name) => ({ name, value: 0 }));

  events
    .filter((event) => event.type === 'PushEvent')
    .forEach((event) => {
      const date = new Date(event.created_at);
      const monthIndex = date.getMonth();
      totals[monthIndex].value += event.payload?.commits?.length || 0;
    });

  return totals.slice(Math.max(0, new Date().getMonth() - 5));
};

router.get('/overview', async (req, res) => {
  try {
    const username = process.env.GITHUB_USERNAME || 'NikhilTyagigg';

    const [profileResponse, reposResponse, eventsResponse] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}`, { headers: getGitHubHeaders() }),
      axios.get(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers: getGitHubHeaders() }),
      axios.get(`https://api.github.com/users/${username}/events/public?per_page=100`, { headers: getGitHubHeaders() })
    ]);

    const profile = profileResponse.data;
    const repos = reposResponse.data || [];
    const events = eventsResponse.data || [];

    const repoCount = profile.public_repos || repos.length;
    const starsEarned = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
    const commits = events.reduce((sum, event) => {
      if (event.type !== 'PushEvent') return sum;
      return sum + (event.payload?.commits?.length || 0);
    }, 0);
    const pullRequests = events.filter((event) => event.type === 'PullRequestEvent').length;
    const developerScore = commits + repoCount * 20 + starsEarned * 5 + pullRequests * 10;

    const latestCommits = events
      .filter((event) => event.type === 'PushEvent')
      .slice(0, 6)
      .map((event) => ({
        repository: event.repo?.name || 'Unknown Repository',
        message: event.payload?.commits?.[0]?.message || 'Push to repository',
        time: new Date(event.created_at).toLocaleString(),
        branch: event.payload?.ref?.replace('refs/heads/', '') || 'main'
      }));

    const recentRepositories = repos.slice(0, 5).map((repo) => ({
      name: repo.name,
      description: repo.description || 'Public repository',
      stars: repo.stargazers_count || 0,
      language: repo.language || 'Unknown'
    }));

    const languagesUsed = repos.reduce((acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {});

    const totalLanguageCount = Object.values(languagesUsed).reduce((sum, value) => sum + value, 0) || 1;
    const languageBreakdown = Object.entries(languagesUsed)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / totalLanguageCount) * 100)
      }));

    const responsePayload = {
      username,
      profile: {
        avatar_url: profile.avatar_url,
        bio: profile.bio || 'Software engineer focused on backend systems and cloud platforms.',
        public_repos: repoCount,
        followers: profile.followers || 0,
        following: profile.following || 0,
        star_count: starsEarned,
        total_commits: commits,
        pull_requests: pullRequests,
        developer_score: developerScore,
        contribution_score: developerScore
      },
      stats: {
        repositories: repoCount,
        followers: profile.followers || 0,
        following: profile.following || 0,
        starsEarned: starsEarned,
        pullRequests,
        commits,
        developerScore
      },
      weeklyActivity: buildWeeklyActivity(events),
      monthlyActivity: buildMonthlyActivity(events),
      latestCommits,
      recentRepositories,
      languagesUsed: languageBreakdown,
      lastUpdated: new Date().toISOString()
    };

    res.json(responsePayload);
  } catch (error) {
    console.error('GitHub overview fetch error:', error.response?.data || error.message);
    const status = error.response?.status === 403 ? 503 : 500;
    const message = status === 503
      ? 'GitHub API rate limit reached. Configure a valid GITHUB_TOKEN on Render.'
      : 'Failed to fetch GitHub data';
    res.status(status).json({ message, error: error.message });
  }
});

module.exports = router;
