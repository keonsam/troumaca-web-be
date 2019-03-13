const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('2-update-asset-identifier-type', function () {

  this.timeout(5000);

  const assetIdentifierType = {
    assetIdentifierTypeId: null,
    name: "Golden State Warriors Home Court",
    canonicalName: "golden_state_warriors_home_court",
    description: "Golden State Warriors Home Court",
    version: null,
    ownerPartyId: "854757a6-8ae3-4a6a-ab41-c29479ad76a9",
    dateModified: null,
  };

  beforeEach(function() {
    var options = {
      uri: host + '/assets/asset-identifier-types',
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

  it('update asset identifier type', function (done) {
    assetIdentifierType.description = "Warriors Home Court";
    api.put("/assets/asset-identifier-types/" + assetIdentifierType.assetIdentifierTypeId)
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', assetIdentifierType.ownerPartyId)
      .send(assetIdentifierType)
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