const express = require('express');
const memeModel = require('./memeModels');

const router = express.Router({ mergeParams: true });

router.post('/', (request, response) => {
  memeModel.create(request.body)
    .then(createdMeme => response.send(createdMeme))
    .catch(failure => response.status(500).send(failure.ermsg));
});

router.get('/', (request, response) => {
  memeModel.find()
    .then(foundMemes => response.send(foundMemes));
});

router.get('/:memeId', (request, response) => {
  memeModel.findById(request.params.memeId)
    .then(foundMeme => response.send(foundMeme))
    .catch(noMemeFound => response.send(noMemeFound));
});

router.delete('/:memeId', (request, response) => {
  memeModel.findByIdAndRemove(request.params.memeId)
    .then(memeRemoved => response.send(memeRemoved))
    .catch(memeNotRemoved => response.status(500).send(memeNotRemoved));
});


module.exports = router;
