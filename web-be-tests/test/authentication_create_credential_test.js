var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

describe('create-credential', function () {

  var credential = {
    username: "tester1@shapestone.com",
    password: "Tester2@user"
  };

  var created = false;

  it('create credential', function (done) {
    api.post('/credentials')
      .set('Accept', 'application/json')
      .set('correlationId', 1234567890)
      .send(credential)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        console.log(res.body);

        if (err) {
        } else {
          created = true
        }

        done();
      });
  });

  // after(function (done) {
  //   if (created) {
  //     api.delete('/credentials/:credentialId')
  //     .set('Accept', 'application/json')
  //     .send({
  //
  //     })
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .end(function (err, res) {
  //       console.log(res.body);
  //
  //       if (err) {
  //       } else {
  //       }
  //
  //       done();
  //     });
  //   }
  // });


});