const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  userModel.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  ((username, password, done) => {
    userModel.findOne({ username, password }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      return done(null, user);
    });
  })));

userModel.addUserToFavorites = addUserToFavorites;
userModel.getAllFavoritesForUser = getAllFavoritesForUser;
module.exports = userModel;

