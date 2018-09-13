var should = require('chai').should(),
  expect = require('chai').expect,
  supertest = require('supertest'),
  api = supertest('http://localhost:3000');

describe('confirm-credential', function () {

  it('confirm credential', function (done) {
    api.post("/authentication/confirmations/{confirmationId}/credentials/{credentialId}")
    .set('Accept', 'application/json')
    .set('correlationId', 1234567890)
    .send(credential)
    .expect('Content-Type', /json/)
    .expect(201)
    .end(function (err, res) {
      //console.log(res.body);
      if (!err) {
        expect(res.body.status).to.equal("New")
      }

      done(err);
    });
  })

});