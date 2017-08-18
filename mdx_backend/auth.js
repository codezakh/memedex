const express = require('express');
const passport = require('passport');
const userModel = require('./users/userModels');

const router = express.Router({ mergeParams: true });

router.post('/login', passport.authenticate('local'), (request, response) => {
  userModel.findOne({ username: request.body.username })
    .then((foundUser) => {
      response.send(foundUser);
    });
});

router.post('/logout', (request, response) => {
  request.logout();
  response.send('logged out');
});

module.exports = router;
