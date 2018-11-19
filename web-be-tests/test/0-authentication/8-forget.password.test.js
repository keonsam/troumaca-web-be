const should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

describe('forget-password', function () {
  // console.log("What");
  this.timeout(50000);

  const time = new Date().getTime();

  const credential = {
    username: "tester1" +time+ "@shapestone.com",
    password: "Tester2@user"
  };

  const user = {
      firstName: "Bom",
      lastName: "Bam"
  };

  let confirmation = {
    confirmationId: "",
    credentialId: "",
    code: "",
    status: ""
  };

  it('forget password create credential', function (done) {
    api.post("/authentication/credentials")
      .set('Accept', 'application/json')
      .set('Correlation-Id', "cc62af18-ea2a-11e8-9f32-f2801f1b9fd1")
      .send({credential, user})
      // .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        console.log("forget password create credential 1");
        if (!err) {
          expect(res.body.confirmationId).to.be.a('string');
          expect(res.body.credentialId).to.be.a('string');
          expect(res.body.code).to.have.lengthOf(6);
          expect(res.body.status).to.equal("New");

          confirmation.confirmationId = res.body.confirmationId;
          confirmation.credentialId = res.body.credentialId;
          confirmation.code = res.body.code;
          confirmation.status = res.body.status;
        } else {
          console.log(err);
        }
        done(err);
      });
  });

  //let confirmation2 = {confirmationId: "", credentialId: "", code: "", status: ""};
  const changePassword = {
    credentialId: "",
    password: credential.password,
    newPassword: "Tester2@user2",
    code: ""
  };

  it('forget password confirm credential', function (done) {
    api.post("/authentication/confirmations/verify")
      .set('Accept', 'application/json')
      .set('Correlation-Id', "e595d0be-ea2a-11e8-9f32-f2801f1b9fd1")
      .send(confirmation)
      // .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        console.log("forget password create credential 2");
        if (!err) {
          console.log(res.body);
          expect(res.body.status).to.equal("Confirmed");

          changePassword.confirmationId = res.body.confirmationId;
          changePassword.credentialId = res.body.credentialId;
          changePassword.code = res.body.code;
        } else {
          console.log(err);
        }
        done(err);
      });
  });

  let usernameMap = {username: credential.username};
  console.log(usernameMap);
  it('forget password send forget password code', function (done) {
    api.post("/authentication/confirmations/resend-by-username")
      .set('Accept', 'application/json')
      .set('Correlation-Id', "f18934a4-ea54-11e8-9f32-f2801f1b9fd1")
      .send(usernameMap)
      // .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        console.log("forget password create credential 3");
        if (!err) {
          console.log(res.body);
          //expect(res.body.status).to.equal("Confirmed")
        } else {
          console.log(err);
        }
        done(err);
      });
  });


  it('forget password change password', function (done) {
    console.log(changePassword);
    api.post("/authentication/change-password")
      .set('Accept', 'application/json')
      .set('Correlation-Id', "f18934a4-ea54-11e8-9f32-f2801f1b9fd1")
      .send(changePassword)
      // .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (!err) {
          console.log(res.body);
          //expect(res.body.status).to.equal("Confirmed")
        } else {
          console.log(err);
        }
        done(err);
      });
  })

});