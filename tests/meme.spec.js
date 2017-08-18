/* eslint-disable no-undef,prefer-arrow-callback */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const memeModel = require('../mdx_backend/memes/memeModels');
const teardown = require('./teardown');

chai.use(chaiHttp);
const expect = chai.expect;
const request = () => chai.request(app);

describe('the /meme endpoint', function () {

  afterEach(function () {
    return teardown();
  });

  beforeEach(function () {
    const self = this;
    return memeModel.find().remove(() => undefined)
      .then(function () {
        return memeModel.create({
          memeUrl: 'http://test-url.com',
          memeText: 'bottom test',
          memeTitle: 'test meme title',
        })
          .then(function (createdMeme) {
            self.testMeme = createdMeme;
            return new Promise(function (resolve) {
              return resolve();
            });
          });
      });
  });

  it('should let you create a meme', function () {
    return request()
      .post('/api/meme')
      .send({
        memeUrl: 'http://test-url-2.com',
        memeText: 'top text',
        memeTitle: 'created meme test title',
      })
      .then(function (response) {
        expect(response).to.have.status(200);
      });
  });

  it('should let you retrieve a meme by id', function () {
    return request()
      .get(`/api/meme/${this.testMeme._id}`)
      .then((response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('_id', String(this.testMeme._id));
      });
  });

  it('should let you retrieve all memes', function () {
    return request()
      .get('/api/meme')
      .then((response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.lengthOf(1);
      });
  });
});
