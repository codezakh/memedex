const mongoose = require('mongoose');
const memeListSchema = require('./memeListSchema');

const memeListModel = mongoose.model('MemeListModel', memeListSchema);

const addMemeToList = (memeListId, memeId) => {
  return memeListModel.findById(memeListId)
    .then((foundMemeList) => {
      foundMemeList.containedMemes.push(memeId);
      return foundMemeList.save();
    });
};

memeListModel.addMemeToList = addMemeToList;
module.exports = memeListModel;
