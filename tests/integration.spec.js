/* eslint-disable no-undef,prefer-arrow-callback */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const userModel = require('../mdx_backend/users/userModels');

chai.use(chaiHttp);
const expect = chai.expect;
const request = () => chai.request(app);

describe('the /user endpoint', function () {
  beforeEach(function () {
    userModel.find().remove(() => undefined);
  });

  it('should allow you to create users', function () {
    return request()
      .post('/api/user')
      .send({ username: 'zaid', password: 'zaid' })
      .then(function (response) {
        expect(response).to.have.status(200);
      });
  });
});
