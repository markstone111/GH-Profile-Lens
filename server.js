require('dotenv').config();
const express = require('express');
const axios = require('axios');
const session = require('express-session');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Setup sessions (in-memory for demo; in production use a store like Redis)
app.use(session({
  secret: process.env.SESSION_SECRET || 'change_this_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // secure: true if using HTTPS in prod
}));

// OAuth login route
app.get('/auth/github', (req, res) => {
  const redirectUri = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=read:user%20user:email%20repo`;
  res.redirect(redirectUri);
});

// GitHub OAuth callback
app.get('/auth/github/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('No code provided');

  try {
    // Exchange code for access token
    const tokenRes = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      { headers: { Accept: 'application/json' } }
    );

    const accessToken = tokenRes.data.access_token;
    if (!accessToken) return res.status(400).send('No access token received');

    // Save token in session
    req.session.githubToken = accessToken;

    // Redirect to profile page (no token in URL)
    res.redirect('/profile.html');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error exchanging code for token');
  }
});

// API route to get user info
app.get('/api/user', async (req, res) => {
  const token = req.session.githubToken;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  try {
    const userRes = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${token}` }
    });
    res.json(userRes.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// API route to get repos
app.get('/api/repos', async (req, res) => {
  const token = req.session.githubToken;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  try {
    const reposRes = await axios.get('https://api.github.com/user/repos?per_page=100', {
      headers: { Authorization: `token ${token}` }
    });
    res.json(reposRes.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch repos' });
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
