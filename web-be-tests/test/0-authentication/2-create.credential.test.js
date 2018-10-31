const should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

describe('create-credential', function () {

  this.timeout(5000);

  const time = new Date().getTime();

  const credential = {
    username: "tester1" +time+ "@shapestone.com",
    password: "Tester2@user"
  };

  const user = {
      firstName: "Bom",
      lastName: "Bam"
  };

  it('create credential', function (done) {
    api.post("/authentication/credentials")
      .set('Accept', 'application/json')
      .set('correlationId', 1234567890)
      .send({credential, user})
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        if (!err) {
            expect(res.body.confirmationId).to.be.a('string');
            expect(res.body.credentialId).to.be.a('string');
            expect(res.body.code).to.have.lengthOf(6);
            expect(res.body.status).to.equal("New");
        }
        done(err);
      });
  });

});