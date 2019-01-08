var should = require('chai').should(),
  expect = require('chai').expect,
  supertest = require('supertest'),
  api = supertest('http://localhost:3000');

describe('add-customer', function () {


  this.timeout(5000);

  const time = new Date().getTime();

  const credential = {
      username: "tester1" + time + "@shapestone.com",
      password: "Tester2@user"
  };

  const organization = {
      name: `My Company ${time}`,
      purpose: "The Big Bad Company",
      email: `myCompany${time}@shapestone.com`,
      number: `1784${time}`,
      address: `In USA`,
      description: "In LA"
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

  let cookie = '';

  it('add company credential', function (done) {
      api.post("/authentication/credentials")
          .set('Accept', 'application/json')
          .set('Correlation-Id', 1234567890)
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
                  console.log(err);
              }
              done(err);
          });
  });


  it('add company confirmation', function (done) {

      console.log("Completed 2.");


      api.post("/authentication/confirmations/verify")
          .set('Accept', 'application/json')
          .set('Correlation-Id', 1234567890)
          .send(confirm)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
              if (!err) {
                  expect(res.body.status).to.equal("Confirmed")
              } else {
                  console.log(err);
              }
              done(err);
          });
  });

  it('should be an authenticated credential with status of "AccountConfirmed"', function (done) {
      api.post('/authentication/authenticate')
          .set('Accept', 'application/json')
          .set('Correlation-Id', 1234567890)
          .send(credential)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
              if (err) {
                  console.log(err);
              }else {
                  expect(res.body.credentialId).to.be.a('string');
                  expect(res.body.sessionId).to.be.a('string');
                  cookie = `sessionId=${res.body.sessionId}`;
                  expect(res.body.partyId).to.be.a('string');
                  expect(res.body.authenticateStatus).to.equal('AccountConfirmed');
              }
              done();
          });
  });

  it('add company organization', function (done) {
      api.post("/organizations/customer")
          .set('Accept', 'application/json')
          .set('Correlation-Id', 1234567890)
          .set('Cookie', [cookie])
          .send(organization)
          .expect('Content-Type', /json/)
          .expect(201)
          .end(function (err, res) {
              if (err) {
                  console.log(err);
              }else {
                  expect(res.body.partyId).to.be.a('string');
              }
              done(err);
          });
  });

});