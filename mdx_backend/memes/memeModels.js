const mongoose = require('mongoose');
const memeSchema = require('./memeSchema');

const memeModel = mongoose.model('MemeModel', memeSchema);

module.exports = memeModel;
