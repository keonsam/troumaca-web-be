const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('4-get-asset-name-type-by-id', function () {

  this.timeout(5000);

  const assetNameType = {
    assetNameTypeId: null,
    name: "Manufacturer",
    canonicalName: "manufacturer",
    description: "Manufacturer",
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

  it('get asset name type', function (done) {
    api.get("/assets/asset-name-types/" + assetNameType.assetNameTypeId)
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', assetNameType.ownerPartyId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (!err) {
          expect(res.body.assetNameTypeId).to.be.equal(assetNameType.assetNameTypeId);
          expect(res.body.name).to.be.equal(assetNameType.name);
          expect(res.body.description).to.be.equal(assetNameType.description);
          expect(res.body.version).to.be.equal(assetNameType.version);
          expect(res.body.dateModified).to.be.equal(assetNameType.dateModified);
        }
        done(err);
      });
  });

});