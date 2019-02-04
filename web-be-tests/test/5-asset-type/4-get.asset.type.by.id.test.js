const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('4-get-asset-type-by-id', function () {

  this.timeout(5000);

  const assetType = {
    assetTypeId: null,
    name: "Manufacturer",
    canonicalName: "manufacturer",
    description: "Manufacturer",
    version: null,
    ownerPartyId: "854757a6-8ae3-4a6a-ab41-c29479ad76a9",
    dateModified: null,
  };

  beforeEach(function() {
    var options = {
      uri: host + '/assets/asset-types',
      method: 'POST',
      json: assetType
    };

    return new Promise(function(resolve) {
      request(options, function (error, response, body) {
        if (!error) {
          assetType.assetTypeId = body.assetTypeId;
          assetType.version = body.version;
          assetType.ownerPartyId = body.ownerPartyId;
          assetType.dateModified = body.dateModified;
        }
        resolve();
      });
    });
  });

  it('get asset type', function (done) {
    api.get("/assets/asset-types/" + assetType.assetTypeId)
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', assetType.ownerPartyId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (!err) {
          expect(res.body.assetTypeId).to.be.equal(assetType.assetTypeId);
          expect(res.body.name).to.be.equal(assetType.name);
          expect(res.body.description).to.be.equal(assetType.description);
          expect(res.body.version).to.be.equal(assetType.version);
          expect(res.body.dateModified).to.be.equal(assetType.dateModified);
        }
        done(err);
      });
  });

});