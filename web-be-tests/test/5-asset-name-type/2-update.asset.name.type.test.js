const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('2-update-asset-name-type', function () {

  this.timeout(5000);

  const assetNameType = {
    assetNameTypeId: null,
    name: "Golden State Warriors Home Court",
    canonicalName: "golden_state_warriors_home_court",
    description: "Golden State Warriors Home Court",
    version: null,
    ownerPartyId: "854757a6-8ae3-4a6a-ab41-c29479ad76a9",
    dateModified: null,
  };

  beforeEach(function() {
    var options = {
      uri: host + '/assets/asset-name-types',
      method: 'POST',
      json: assetNameType
    };

    return new Promise(function(resolve) {
      request(options, function (error, response, body) {
        if (!error) {
          assetNameType.assetNameTypeId = body.assetNameTypeId;
          assetNameType.version = body.version;
          assetNameType.ownerPartyId = body.ownerPartyId;
          assetNameType.dateModified = body.dateModified;
        }
        resolve();
      });
    });
  });

  it('update asset name type', function (done) {
    assetNameType.description = "Warriors Home Court";
    api.put("/assets/asset-name-types/" + assetNameType.assetNameTypeId)
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', assetNameType.ownerPartyId)
      .send(assetNameType)
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