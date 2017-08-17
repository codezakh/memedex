/* eslint-disable no-undef,prefer-arrow-callback */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const memeListModel = require('../mdx_backend/memelists/memeListModels');
const memeModel = require('../mdx_backend/memes/memeModels');

chai.use(chaiHttp);
const expect = chai.expect;
const request = () => chai.request(app);

describe('the /memelist endpoint', function () {
  beforeEach(function () {
    const self = this;
    return memeListModel.find().remove(() => undefined)
      .then(function () {
        return memeListModel.create({
          listTitle: 'test list',
        })
          .then(function (createdMemeList) {
            self.testMemeList = createdMemeList;
            return new Promise(function (resolve) {
              return resolve();
            });
          });
      });
  });

  afterEach(function () {
    return memeModel.find().remove(() => undefined)
      .then(function () {
        return memeListModel.find().remove(() => undefined);
      });
  });

  it('should let you create a memelist', function () {
    return request()
      .post('/api/memelist')
      .send({
        listTitle: 'meme list title',
      })
      .then((response) => {
        expect(response).to.have.status(200);
      });
  });

  it('should let you retrieve a memelist by id', function () {
    return request()
      .get(`/api/memelist/${this.testMemeList._id}`)
      .then((response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('_id', String(this.testMemeList._id));
      });
  });

  it('should let you add a meme to a memelist', function () {
    return memeModel.create({
      memeUrl: 'url',
      memeTitle: 'memeTitle',
    }).then(createdMeme => request()
      .put(`/api/memelist/${this.testMemeList._id}`)
      .send({ addMeme: createdMeme._id })
      .then((response) => {
        expect(response).to.have.status(200);
        return memeListModel.findById(this.testMemeList._id)
          .then((modifiedMemeList) => {
            expect(modifiedMemeList.containedMemes).to.deep.equal([createdMeme._id]);
          });
      }));
  });
});
