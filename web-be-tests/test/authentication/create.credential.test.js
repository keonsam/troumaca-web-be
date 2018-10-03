var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

describe('create-credential', function () {

  this.timeout(5000);

  var time = new Date().getTime();

  var credential = {
    firstName: "Bom",
    lastName: "Bam",
    username: "tester1" +time+ "@shapestone.com",
    password: "Tester2@user"
  };

  it('create credential', function (done) {
    api.post("/authentication/credentials")
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
  });

});