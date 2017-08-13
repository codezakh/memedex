const mongoose = require('mongoose');
const userSchema = require('./userSchema');

const userModel = mongoose.model('UserModel', userSchema);

module.exports = userModel;

