const mongoose = require('mongoose');

const memeListSchema = mongoose.Schema({
  listTitle: { type: String, required: true},
  containedMemes: [mongoose.Schema.Types.ObjectId],
});

module.exports = memeListSchema;
