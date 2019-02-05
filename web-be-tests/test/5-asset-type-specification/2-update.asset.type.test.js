const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('2-update-asset-specification', function () {

  this.timeout(5000);

  const assetSpecification = {
    assetTypeId: null,
    name: "Golden State Warriors Home Court",
    canonicalName: "golden_state_warriors_home_court",
    description: "Golden State Warriors Home Court",
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

  it('update asset specification', function (done) {
    assetSpecification.description = "Warriors Home Court";
    api.put("/assets/asset-types/" + assetSpecification.assetTypeId)
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', assetSpecification.ownerPartyId)
      .send(assetSpecification)
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