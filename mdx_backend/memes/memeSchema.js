const mongoose = require('mongoose');

const memeSchema = mongoose.Schema({
  memeUrl: { type: String, required: true, unique: true },
  memeText: String,
  memeTitle: { type: String, required: true },
  memeThumbnail: String,
});

module.exports = memeSchema;
