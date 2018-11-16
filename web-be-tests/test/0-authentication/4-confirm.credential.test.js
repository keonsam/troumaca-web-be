var should = require('chai').should(),
  expect = require('chai').expect,
  supertest = require('supertest'),
  api = supertest('http://localhost:3000');

describe('confirm-credential', function () {

  this.timeout(5000);

  // Note: Possible temporary comment out
  const time = new Date().getTime();

  const credential = {
    username: "tester1" +time+ "@shapestone.com",
    password: "Tester2@user"
  };

  const user = {
      firstName: "Bom",
      lastName: "Bam",
  };

  const confirm = {
    confirmationId: "fdab7572-e565-11e8-a71a-695317f6b9e2",
    credentialId: "fdab756f-e565-11e8-a71a-bf2aca92fab8",
    code: "226408"
  };

  it('create credential', function (done) {
    api.post("/authentication/credentials")
      .set('Accept', 'application/json')
      .set('Correlation-Id', 1234567890)
      .send({credential, user})
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        if (!err) {
          expect(res.body.status).to.equal("New");
          confirm.confirmationId = res.body.confirmationId;
          confirm.credentialId = res.body.credentialId;
          confirm.code = res.body.code;
        } else {
            console.log(err);
        }
        done(err);
      });
  });


  it('confirm credential', function (done) {

    api.post("/authentication/confirmations/verify")
      .set('Accept', 'application/json')
      .set('Correlation-Id', 1234567890)
      .send(confirm)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (!err) {
          console.log(res.body);
          expect(res.body.status).to.equal("Confirmed")
        } else {
            console.log(err);
        }
        done(err);
      });
  });

});