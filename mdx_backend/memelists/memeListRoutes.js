const express = require('express');
const memeListModel = require('./memeListModels');

const router = express.Router({ mergeParams: true });

router.post('/', (request, response) => {
  memeListModel.create(request.body)
    .then(createdMemeList => response.send(createdMemeList))
    .catch(failure => response.status(500).send(failure.ermsg));
});

router.get('/', (request, response) => {
  if (request.query.user) {
    memeListModel.find({ owner: request.query.user })
      .then(foundUsers => response.send(foundUsers))
      .catch(notFound => response.status(404).send(notFound));
  } else {
    memeListModel.find()
      .then(foundMemeLists => response.send(foundMemeLists))
      .catch(() => response.send([]));
  }
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
    memeListModel.findByIdAndUpdate(request.params.memeListId,
      { $set: request.body }, { new: true })
      .then(updatedDocument => response.send(updatedDocument))
      .catch(updateFailed => response.status(500).send(updateFailed));
  }
});

router.delete('/:memeListId', (request, response) => {
  memeListModel.findByIdAndRemove(request.params.memeListId)
    .then(memeListRemoved => response.send(memeListRemoved))
    .catch(memeListNotRemoved => response.status(500).send(memeListNotRemoved));
});

module.exports = router;
