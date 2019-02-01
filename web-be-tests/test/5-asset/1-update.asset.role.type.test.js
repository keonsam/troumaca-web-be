const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('update-asset-role-type', function () {

  this.timeout(5000);

  const assetRoleType = {
    assetRoleTypeId: null,
    name: "Manufacturer",
    canonicalName: "manufacturer",
    description: "Manufacturer",
    version: null,
    ownerPartyId: null,
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

  it('update asset role type', function (done) {
    assetRoleType.description = "The retailer";
    api.put("/assets/asset-role-types/" + assetRoleType.assetRoleTypeId)
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
      .send(assetRoleType)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {

        if (!err) {
          expect(res.body.affected).to.be.equal(1);
        }

        done(err);

      });
  });

});