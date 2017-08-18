const mongoose = require('mongoose');
const _ = require('lodash');
const userSchema = require('./userSchema');

const userModel = mongoose.model('UserModel', userSchema);

const addUserToFavorites = (userId, userToFavoriteId) => userModel.findById(userId)
  .then((foundUser) => {
    foundUser.favoritedUsers.push(userToFavoriteId);
    return foundUser.save();
  });

const getAllFavoritesForUser = userId => userModel.findById(userId)
  .then(foundUser => userModel.find({
    _id: {
      $in: _.map(foundUser.favoritedUsers, favUserId => mongoose.Types.ObjectId(favUserId)),
    },
  }));

userModel.addUserToFavorites = addUserToFavorites;
userModel.getAllFavoritesForUser = getAllFavoritesForUser;
module.exports = userModel;

