// models/PhishingLink.js (for phishing links)
const mongoose = require('mongoose');

const phishingSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true }
}, { timestamps: true });

const PhishingLink = mongoose.models.PhishingLink || mongoose.model('PhishingLink', phishingSchema);

module.exports = PhishingLink;
