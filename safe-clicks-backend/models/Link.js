const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('PhishingLink', linkSchema);
