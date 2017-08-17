const userModel = require('../mdx_backend/users/userModels');
const memeModel = require('../mdx_backend/memes/memeModels');
const memeListModel = require('../mdx_backend/memelists/memeListModels');

const doNothing = () => undefined;

module.exports = () => userModel.find().remove(doNothing)
  .then(() => memeModel.find().remove(doNothing)
    .then(() => memeListModel.find().remove(doNothing)));
