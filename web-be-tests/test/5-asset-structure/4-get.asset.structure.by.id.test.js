const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('4-get-asset-structure-by-id', function () {

  this.timeout(5000);

  const assetIdentifierType = {
    assetIdentifierTypeId: null,
    name: "Manufacturer",
    canonicalName: "manufacturer",
    description: "Manufacturer",
    version: null,
    ownerPartyId: "854757a6-8ae3-4a6a-ab41-c29479ad76a9",
    dateModified: null,
  };

  beforeEach(function() {
    var options = {
      uri: host + '/assets/asset-structures',
      method: 'POST',
      json: assetIdentifierType
    };

    return new Promise(function(resolve) {
      request(options, function (error, response, body) {
        if (!error) {
          assetIdentifierType.assetIdentifierTypeId = body.assetIdentifierTypeId;
          assetIdentifierType.version = body.version;
          assetIdentifierType.ownerPartyId = body.ownerPartyId;
          assetIdentifierType.dateModified = body.dateModified;
        }
        resolve();
      });
    });
  });

  it('get asset structure', function (done) {
    api.get("/assets/asset-structures/" + assetIdentifierType.assetIdentifierTypeId)
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', assetIdentifierType.ownerPartyId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (!err) {
          expect(res.body.assetIdentifierTypeId).to.be.equal(assetIdentifierType.assetIdentifierTypeId);
          expect(res.body.name).to.be.equal(assetIdentifierType.name);
          expect(res.body.description).to.be.equal(assetIdentifierType.description);
          expect(res.body.version).to.be.equal(assetIdentifierType.version);
          expect(res.body.dateModified).to.be.equal(assetIdentifierType.dateModified);
        }
        done(err);
      });
  });

});