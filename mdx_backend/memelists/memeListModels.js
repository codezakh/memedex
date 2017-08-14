const mongoose = require('mongoose');
const memeListSchema = require('./memeListSchema');

const memeListModel = mongoose.model('MemeListModel', memeListSchema);

module.exports = memeListModel;
