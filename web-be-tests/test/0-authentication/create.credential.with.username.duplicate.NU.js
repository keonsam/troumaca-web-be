var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

describe('create-duplicate-credential', function () {
  
  this.timeout(5000);

  var credential = {
    username: "tester1@shapestone.com",
    password: "Tester2@user"
  };

  it('create credential with error', function (done) {
    api.post("/authentication/credentials")
      .set('Accept', 'application/json')
      .set('correlationId', 1234567890)
      .send(credential)
      .expect('Content-Type', /json/)
      .expect(409)
      .end(function (err, res) {
        //console.log(res.body);
        done(err);
      });
  });

});