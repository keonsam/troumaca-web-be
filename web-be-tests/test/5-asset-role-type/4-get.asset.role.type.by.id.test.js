const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('4-get-asset-role-type-by-id', function () {

  this.timeout(5000);

  const assetRoleType = {
    assetRoleTypeId: null,
    name: "Manufacturer",
    canonicalName: "manufacturer",
    description: "Manufacturer",
    version: null,
    ownerPartyId: "854757a6-8ae3-4a6a-ab41-c29479ad76a9",
    dateModified: null,
  };

  beforeEach(function() {
    var options = {
      uri: host + '/assets/asset-role-types',
      method: 'POST',
      json: assetRoleType
    };

    return new Promise(function(resolve) {
      request(options, function (error, response, body) {
        if (!error) {
          assetRoleType.assetRoleTypeId = body.assetRoleTypeId;
          assetRoleType.version = body.version;
          assetRoleType.ownerPartyId = body.ownerPartyId;
          assetRoleType.dateModified = body.dateModified;
        }
        resolve();
      });
    });
  });

  it('get asset role type', function (done) {
    api.get("/assets/asset-role-types/" + assetRoleType.assetRoleTypeId)
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', assetRoleType.ownerPartyId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (!err) {
          expect(res.body.assetRoleTypeId).to.be.equal(assetRoleType.assetRoleTypeId);
          expect(res.body.name).to.be.equal(assetRoleType.name);
          expect(res.body.description).to.be.equal(assetRoleType.description);
          expect(res.body.version).to.be.equal(assetRoleType.version);
          expect(res.body.dateModified).to.be.equal(assetRoleType.dateModified);
        }
        done(err);
      });
  });

});