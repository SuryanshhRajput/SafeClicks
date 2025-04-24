const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
console.log('MONGO_URI from .env:', process.env.MONGO_URI);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Create Schema + Model
const phishingSchema = new mongoose.Schema({
  url: String,
});

const PhishingLink = mongoose.model('PhishingLink', phishingSchema);

// API to check the link
app.post('/api/check-link', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: 'URL required' });

  const found = await PhishingLink.findOne({ url });
  res.json({
    safe: !found,
    message: found ? "Unsafe Link" : "Safe Link"
  });
});

// Optional: Add new phishing link to DB
app.post('/api/add-link', async (req, res) => {
  const { url } = req.body;
  console.log("API Hit with URL:", url);
  
  try {
    const newLink = new PhishingLink({ url });
    await newLink.save();
    res.status(200).json({ message: 'Link added as phishing' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add link' });
  }
});


app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
