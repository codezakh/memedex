const mongoose = require('mongoose');

const memeListSchema = mongoose.Schema({
  listTitle: { type: String, required: true },
  containedMemes: [mongoose.Schema.Types.ObjectId],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true },
});

module.exports = memeListSchema;
