const express = require('express');
const router = express.Router();
const PhishingLink = require('../models/Link');

// POST /api/check-link
router.post('/check-link', async (req, res) => {
  const { url } = req.body;

  try {
    const found = await PhishingLink.findOne({ url });
    if (found) {
      res.json({ safe: false, message: 'Unsafe Link' });
    } else {
      res.json({ safe: true, message: 'Safe Link' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
