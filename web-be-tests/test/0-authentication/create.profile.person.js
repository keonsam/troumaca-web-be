var should = require('chai').should(),
  expect = require('chai').expect,
  supertest = require('supertest'),
  api = supertest('http://localhost:3000');

describe('create-profile-person', function () {

  this.timeout(5000);

  var person = {
    "partyType": "Person",
    "firstName": "Miguel",
    "middleName": "Frederick",
    "lastName": "Williams",
    "dateOfBirth": "2018-09-28T04:55:47Z"
  };

  var profile = {
    person: person
  };

  it('create profile person', function (done) {
    api.post("/profiles/persons")
      .set('Accept', 'application/json')
      .set('correlationId', 1234567890)
      .send(profile)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        console.log(res.body);
        done(err);
      });
  });

});