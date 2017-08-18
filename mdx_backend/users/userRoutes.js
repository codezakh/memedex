const express = require('express');
const userModel = require('./userModels');

const router = express.Router({ mergeParams: true });

router.post('/', (request, response) => {
  userModel.create(request.body)
    .then(createdUser => response.send(createdUser))
    .catch(failure => response.status(500).send(failure.errmsg));
});

router.get('/', (request, response) => {
  userModel.find()
    .then(allUsers => response.send(allUsers));
});

router.get('/:userId', (request, response) => {
  userModel.findById(request.params.userId)
    .then(foundUser => response.send(foundUser))
    .catch(noUserFound => response.status(404).send(noUserFound));
});

router.patch('/:userId', (request, response) => {
  if (request.body.addFavorite) {
    userModel.addUserToFavorites(request.params.userId, request.body.addFavorite)
      .then(userFavorited => response.send(userFavorited))
      .catch(userNotFavorited => response.status(500).send(userNotFavorited));
  } else {
    response.status(400).send('no user to favorite');
  }
});

router.delete('/:userId', (request, response) => {
  userModel.findByIdAndRemove(request.params.userId)
    .then(userRemoved => response.send(userRemoved))
    .catch(userNotRemoved => response.status(500).send(userNotRemoved));
});

router.put('/:userId', (request, response) => {
  userModel.findByIdAndUpdate(request.params.userId, { $set: request.body },
    { new: true })
    .then(updatedDocument => response.send(updatedDocument))
    .catch(updatedFailed => response.status(500).send(updatedFailed));
});

router.get('/:userId/favorites', (request, response) => {
  userModel.getAllFavoritesForUser(request.params.userId)
    .then(foundFavorites => response.send(foundFavorites))
    .catch(notFoundFavorites => response.status(404).send(notFoundFavorites));
});

module.exports = router;
