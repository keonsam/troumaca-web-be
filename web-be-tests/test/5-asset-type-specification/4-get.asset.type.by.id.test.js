const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('4-get-asset-specification-by-id', function () {

  this.timeout(5000);

  const assetSpecification = {
    assetTypeId: null,
    name: "Manufacturer",
    canonicalName: "manufacturer",
    description: "Manufacturer",
    modelNumber: "74596123",
    standardPrice: 1030.10,
    version: null,
    ownerPartyId: "854757a6-8ae3-4a6a-ab41-c29479ad76a9",
    dateModified: null,
  };

  beforeEach(function() {
    var options = {
      uri: host + '/assets/asset-types',
      method: 'POST',
      json: assetSpecification
    };

    return new Promise(function(resolve) {
      request(options, function (error, response, body) {
        if (!error) {
          assetSpecification.assetTypeId = body.assetTypeId;
          assetSpecification.version = body.version;
          assetSpecification.ownerPartyId = body.ownerPartyId;
          assetSpecification.dateModified = body.dateModified;
        }
        resolve();
      });
    });
  });

  it('get asset specification', function (done) {
    api.get("/assets/asset-types/" + assetSpecification.assetTypeId)
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', assetSpecification.ownerPartyId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (!err) {
          expect(res.body.assetTypeId).to.be.equal(assetSpecification.assetTypeId);
          expect(res.body.name).to.be.equal(assetSpecification.name);
          expect(res.body.description).to.be.equal(assetSpecification.description);
          expect(res.body.version).to.be.equal(assetSpecification.version);
          expect(res.body.dateModified).to.be.equal(assetSpecification.dateModified);
        }
        done(err);
      });
  });

});