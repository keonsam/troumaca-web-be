var should = require('chai').should(),
  expect = require('chai').expect,
  supertest = require('supertest'),
  api = supertest('http://localhost:3000');

describe('create-profile-organization', function () {

  this.timeout(5000);

  var organization = {
    name: "My Company",
    purpose: "The Big Bad Company",
    description: "In LA"
  };

  var accessRoles = {};

  var person = {};

  var profile = {
    organization: organization,
    accessRoles: accessRoles,
    person: person
  };

  it('create profile organization', function (done) {
    api.post("/profiles/organizations")
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

// partyId: "",
// name: "",
// purpose: "",
// description: "",
// version: "",
// tenantPartyId: "",
// modifiedOn: ""

// partyId,
// name,
// purpose,
// description,
// version,
// tenantPartyId,
// modifiedOn