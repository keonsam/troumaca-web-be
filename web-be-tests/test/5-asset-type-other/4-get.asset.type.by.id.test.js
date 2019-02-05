const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('4-get-other-asset-type-by-id', function () {

  this.timeout(5000);

  const otherAssetType = {
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
      json: otherAssetType
    };

    return new Promise(function(resolve) {
      request(options, function (error, response, body) {
        if (!error) {
          otherAssetType.assetTypeId = body.assetTypeId;
          otherAssetType.version = body.version;
          otherAssetType.ownerPartyId = body.ownerPartyId;
          otherAssetType.dateModified = body.dateModified;
        }
        resolve();
      });
    });
  });

  it('get other asset type', function (done) {
    api.get("/assets/asset-types/" + otherAssetType.assetTypeId)
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', otherAssetType.ownerPartyId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (!err) {
          expect(res.body.assetTypeId).to.be.equal(otherAssetType.assetTypeId);
          expect(res.body.name).to.be.equal(otherAssetType.name);
          expect(res.body.description).to.be.equal(otherAssetType.description);
          expect(res.body.version).to.be.equal(otherAssetType.version);
          expect(res.body.dateModified).to.be.equal(otherAssetType.dateModified);
        }
        done(err);
      });
  });

});