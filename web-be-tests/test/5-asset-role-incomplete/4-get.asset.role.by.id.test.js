const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('4-get-asset-role-by-id', function () {

  this.timeout(5000);

  const asstRole = {
    asstRoleId: null,
    name: "Manufacturer",
    canonicalName: "manufacturer",
    description: "Manufacturer",
    version: null,
    ownerPartyId: "854757a6-8ae3-4a6a-ab41-c29479ad76a9",
    dateModified: null,
  };

  beforeEach(function() {
    var options = {
      uri: host + '/assets/asset-roles',
      method: 'POST',
      json: asstRole
    };

    return new Promise(function(resolve) {
      request(options, function (error, response, body) {
        if (!error) {
          asstRole.asstRoleId = body.asstRoleId;
          asstRole.version = body.version;
          asstRole.ownerPartyId = body.ownerPartyId;
          asstRole.dateModified = body.dateModified;
        }
        resolve();
      });
    });
  });

  it('get asset role type', function (done) {
    api.get("/assets/asset-roles/" + asstRole.asstRoleId)
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', asstRole.ownerPartyId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (!err) {
          expect(res.body.asstRoleId).to.be.equal(asstRole.asstRoleId);
          expect(res.body.name).to.be.equal(asstRole.name);
          expect(res.body.description).to.be.equal(asstRole.description);
          expect(res.body.version).to.be.equal(asstRole.version);
          expect(res.body.dateModified).to.be.equal(asstRole.dateModified);
        }
        done(err);
      });
  });

});