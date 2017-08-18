const memeTextExtractor = require('./memeTextExtractor');
const memeModel = require('../memes/memeModels');
const redditPostDownloader = require('./redditPostDownloader');
const _ = require('lodash');
require('../../server');

new redditPostDownloader('historymemes', 1)
  .downloadPostJson()
  .then((downloadedMemes) => {
    _.map(downloadedMemes, (singleMeme) => {
      memeTextExtractor.requestCognitionOCROnMeme(singleMeme.memeUrl)
        .then((cognitionResponse) => {
          const memeText = memeTextExtractor.parseCognitionResponse(
            JSON.parse(cognitionResponse)).join(' ');
          if (memeText) {
            const memeToSave = singleMeme;
            memeToSave.memeText = memeText;
            memeModel.create(memeToSave);
          }
        });
    });
  });

