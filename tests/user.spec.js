/* eslint-disable no-undef,prefer-arrow-callback */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const userModel = require('../mdx_backend/users/userModels');
const teardown = require('./teardown');

chai.use(chaiHttp);
const expect = chai.expect;
const request = () => chai.request(app);

describe('the /user endpoint', function () {
  beforeEach(function () {
    const self = this;
    return userModel.find().remove(() => undefined)
      .then(function () {
        return userModel.create({
          username: 'testuser',
          password: 'testpassword',
        })
          .then(function (createdTestUser) {
            self.testUser = createdTestUser;
            return new Promise(function (resolve) {
              return resolve();
            });
          });
      });
  });

  afterEach(function () {
    return teardown();
  });

  it('should allow you to create users', function () {
    return request()
      .post('/api/user')
      .send({ username: 'zaid', password: 'zaid' })
      .then(function (response) {
        expect(response).to.have.status(200);
      });
  });

  it('should allow you to retrieve a user by id', function () {
    return request()
      .get(`/api/user/${this.testUser._id}`)
      .then((response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('_id', String(this.testUser._id));
      });
  });

  it('should allow one user to favorite another user by id', function () {
    return userModel.create({ username: 'usertofavorite', password: 'password' })
      .then(createdUser => request()
        .patch(`/api/user/${this.testUser._id}`)
        .send({ addFavorite: createdUser._id })
        .then((response) => {
          expect(response).to.have.status(200);
          return userModel.findById(this.testUser._id)
            .then((modifiedUser) => {
              expect(modifiedUser.favoritedUsers).to.deep.equal([createdUser._id]);
            });
        }));
  });
});
