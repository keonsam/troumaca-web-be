var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

describe('authenticate-credential', function () {

  it('should be an authenticated credential with status of "AccountActive"', function (done) {
      api.post('/authentication/authenticate')
          .set('Accept', 'application/json')
          .set('Correlation-Id', 1234567890)
          .send({
              username: "tester1@shapestone.com",
              password: "Tester2@user"
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
              if (err) {
                  console.log(err);
              }
              expect(res.body.credentialId).to.be.a('string');
              expect(res.body.sessionId).to.be.a('string');
              expect(res.body.partyId).to.be.a('string');
              expect(res.body.authenticateStatus).to.equal('AccountActive');
              done();
          });
  });

  it('should be an authenticated credential with status of "AccountConfirmed"', function (done) {
      api.post('/authentication/authenticate')
          .set('Accept', 'application/json')
          .set('Correlation-Id', 1234567890)
          .send({
              username: "tester2@shapestone.com",
              password: "Tester2@user"
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
              if (err) {
                  console.log(err);
              }
              expect(res.body.credentialId).to.be.a('string');
              expect(res.body.sessionId).to.be.a('string');
              expect(res.body.partyId).to.be.a('string');
              expect(res.body.authenticateStatus).to.equal('AccountConfirmed');
              done();
          });
  });

  it('should be an authenticated credential with status of "AccountUsernameNotConfirmed"', function (done) {
      api.post('/authentication/authenticate')
          .set('Accept', 'application/json')
          .set('Correlation-Id', 1234567890)
          .send({
              username: "tester3@shapestone.com",
              password: "Tester2@user"
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
              if (err) {
                  console.log(err);
              }
              expect(res.body.credentialId).to.be.a('string');
              expect(res.body.confirmationId).to.be.a('string');
              expect(res.body.partyId).to.be.a('string');
              expect(res.body.authenticateStatus).to.equal('AccountUsernameNotConfirmed');
              done();
          });
  });

  it('should be a failed authentication with wrong username', function (done) {
      api.post('/authentication/authenticate')
          .set('Accept', 'application/json')
          .set('Correlation-Id', 1234567890)
          .send({
              username: "tester11@shapestone.com",
              password: "Tester2@user"
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
              if (err) {
                  console.log(err);
              }
              done();
          });
  });

  it('should be a failed authentication with wrong password', function (done) {
      api.post('/authentication/authenticate')
          .set('Accept', 'application/json')
          .set('Correlation-Id', 1234567890)
          .send({
              username: "tester1@shapestone.com",
              password: "Tester3@user"
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
              if (err) {
                  console.log(err);
              }
              done();
          });
  });

});