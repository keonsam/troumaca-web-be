var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

describe('validate-password', function () {

  it('should be a valid password', function (done) {
      api.post('/authentication/validate-password')
          .set('Accept', 'application/json')
          .send({password: "What@Y0uS4y"})
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
              expect(res.body.valid).to.equal(true);
              done();
          });
  });

  it('should be an invalid password', function (done) {
      api.post('/authentication/validate-password')
          .set('Accept', 'application/json')
          .send({password: "What@Y0"})
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
              expect(res.body.valid).to.equal(false);
              done();
          });
  });

  // TODO: add more tests to check different situations

});