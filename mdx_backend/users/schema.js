const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
  favoritedUsers: [mongoose.Schema.Types.ObjectId],
  memeLists: [mongoose.Schema.Types.ObjectId],
});

module.exports = userSchema;
