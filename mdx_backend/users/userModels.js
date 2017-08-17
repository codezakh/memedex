const mongoose = require('mongoose');
const userSchema = require('./userSchema');

const userModel = mongoose.model('UserModel', userSchema);

const addUserToFavorites = (userId, userToFavoriteId) => userModel.findById(userId)
  .then((foundUser) => {
    foundUser.favoritedUsers.push(userToFavoriteId);
    return foundUser.save();
  });

userModel.addUserToFavorites = addUserToFavorites;
module.exports = userModel;

