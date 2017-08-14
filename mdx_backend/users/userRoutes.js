const express = require('express');
const userModel = require('./userModels');

const router = express.Router({ mergeParams: true });

router.post('/', (request, response) => {
  userModel.create(request.body)
    .then(createdUser => response.send(createdUser))
    .catch(failure => response.status(500).send(failure.errmsg));
});

router.get('/:userId', (request, response) => {
  userModel.findById(request.params.userId)
    .then(foundUser => response.send(foundUser))
    .catch(noUserFound => response.status(404).send(noUserFound));
});

router.patch(':/userId', (request, response) => {
  userModel.findByIdAndUpdate(request.params.userId, request.body)
    .then(userUpdated => response.send(userUpdated))
    .catch(failedToUpdate => response.status(500).send(failedToUpdate));
});

module.exports = router;
