var should = require('chai').should(),
  expect = require('chai').expect,
  supertest = require('supertest'),
  api = supertest('http://localhost:3000');

describe('confirm-credential', function () {

  this.timeout(5000);

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
    confirmationId: "",
    credentialId: "",
    code: ""
  };

  it('confirm create credential', function (done) {
    api.post("/authentication/credentials")
      .set('Accept', 'application/json')
      .set('correlationId', 1234567890)
      .send({credential, user})
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        if (!err) {
          expect(res.body.status).to.equal("New");
          console.log("Completed B.");
          confirm.confirmationId = res.body.confirmationId;
          confirm.credentialId = res.body.credentialId;
          confirm.code = res.body.code;
        } else {
        }
        done(err);
      });
  });


  it('confirm create credential 2', function (done) {

    console.log("Completed 2.");

    api.post("/authentication/confirmations/verify")
      .set('Accept', 'application/json')
      .set('correlationId', 1234567890)
      .send(confirm)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        console.log(err);
        if (!err) {
          expect(res.body.status).to.equal("Confirmed")
        }
        done(err);
      });
  });

});