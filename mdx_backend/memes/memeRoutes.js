const express = require('express');
const memeModel = require('./memeModels');

const router = express.Router({ mergeParams: true });

router.post('/', (request, response) => {
  memeModel.create(request.body)
    .then(createdMeme => response.send(createdMeme))
    .catch(failure => response.status(500).send(failure.ermsg));
});

router.get('/:memeId', (request, response) => {
  memeModel.findById(request.params.memeId)
    .then(foundMeme => response.send(foundMeme))
    .catch(noMemeFound => response.send(noMemeFound));
});

module.exports = router;
