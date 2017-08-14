const express = require('express');
const memeListModel = require('./memeListModels');

const router = express.Router({ mergeParams: true });

router.post('/', (request, response) => {
  memeListModel.create(request.body)
    .then(createdMemeList => response.send(createdMemeList))
    .catch(failure => response.status(500).send(failure.ermsg));
});

router.get('/:memeListId', (request, response) => {
  memeListModel.findById(request.params.memeListId)
    .then(foundMemeList => response.send(foundMemeList))
    .catch(failure => response.status(404).send(failure));
});

module.exports = router;
