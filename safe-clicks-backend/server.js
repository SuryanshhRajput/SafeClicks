// safe-clicks-backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PhishingLink = require('./models/PhishingLink');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS & JSON parsing
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ DB error:', err));

// POST /api/check-link
app.post('/api/check-link', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: 'URL required' });

  try {
    const found = await PhishingLink.findOne({ url });
    res.json({ safe: !found, message: found ? 'Unsafe Link' : 'Safe Link' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/check-link?url=<your-url>
app.get('/api/check-link', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ message: 'URL required in query string' });

  try {
    const found = await PhishingLink.findOne({ url });
    res.json({ safe: !found, message: found ? 'Unsafe Link' : 'Safe Link' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
