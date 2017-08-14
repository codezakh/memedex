/* eslint-disable no-undef,prefer-arrow-callback */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const memeListModel = require('../mdx_backend/memelists/memeListModels');

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
});
