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

router.put('/:memeListId', (request, response) => {
  if (request.body.addMeme) {
    memeListModel.addMemeToList(request.params.memeListId, request.body.addMeme)
      .then(memeAdded => response.send(memeAdded))
      .catch(memeNotAdded => response.status(500).send(memeNotAdded));
  } else {
    response.status(400).send('no meme to add');
  }
});

module.exports = router;
