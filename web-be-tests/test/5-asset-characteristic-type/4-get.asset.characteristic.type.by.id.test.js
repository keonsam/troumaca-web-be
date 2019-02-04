const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('4-get-asset-characteristic-type-by-id', function () {

  this.timeout(5000);

  const assetCharacteristicType = {
    assetCharacteristicTypeId: null,
    name: "Manufacturer",
    canonicalName: "manufacturer",
    description: "Manufacturer",
    version: null,
    ownerPartyId: "854757a6-8ae3-4a6a-ab41-c29479ad76a9",
    dateModified: null,
  };

  beforeEach(function() {
    var options = {
      uri: host + '/assets/asset-characteristic-types',
      method: 'POST',
      json: assetCharacteristicType
    };

    return new Promise(function(resolve) {
      request(options, function (error, response, body) {
        if (!error) {
          assetCharacteristicType.assetCharacteristicTypeId = body.assetCharacteristicTypeId;
          assetCharacteristicType.version = body.version;
          assetCharacteristicType.ownerPartyId = body.ownerPartyId;
          assetCharacteristicType.dateModified = body.dateModified;
        }
        resolve();
      });
    });
  });

  it('get asset characteristic type', function (done) {
    api.get("/assets/asset-characteristic-types/" + assetCharacteristicType.assetCharacteristicTypeId)
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', assetCharacteristicType.ownerPartyId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (!err) {
          expect(res.body.assetCharacteristicTypeId).to.be.equal(assetCharacteristicType.assetCharacteristicTypeId);
          expect(res.body.name).to.be.equal(assetCharacteristicType.name);
          expect(res.body.description).to.be.equal(assetCharacteristicType.description);
          expect(res.body.version).to.be.equal(assetCharacteristicType.version);
          expect(res.body.dateModified).to.be.equal(assetCharacteristicType.dateModified);
        }
        done(err);
      });
  });

});