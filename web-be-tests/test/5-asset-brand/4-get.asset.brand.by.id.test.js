const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('4-get-asset-brand-by-id', function () {

  this.timeout(5000);

  const assetBrand = {
    assetBrandId: null,
    name: "Manufacturer",
    canonicalName: "manufacturer",
    description: "Manufacturer",
    version: null,
    ownerPartyId: "854757a6-8ae3-4a6a-ab41-c29479ad76a9",
    dateModified: null,
  };

  beforeEach(function() {
    var options = {
      uri: host + '/assets/asset-brands',
      method: 'POST',
      json: assetBrand
    };

    return new Promise(function(resolve) {
      request(options, function (error, response, body) {
        if (!error) {
          assetBrand.assetBrandId = body.assetBrandId;
          assetBrand.version = body.version;
          assetBrand.ownerPartyId = body.ownerPartyId;
          assetBrand.dateModified = body.dateModified;
        }
        resolve();
      });
    });
  });

  it('get asset brand type', function (done) {
    api.get("/assets/asset-brands/" + assetBrand.assetBrandId)
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', assetBrand.ownerPartyId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (!err) {
          expect(res.body.assetBrandId).to.be.equal(assetBrand.assetBrandId);
          expect(res.body.name).to.be.equal(assetBrand.name);
          expect(res.body.description).to.be.equal(assetBrand.description);
          expect(res.body.version).to.be.equal(assetBrand.version);
          expect(res.body.dateModified).to.be.equal(assetBrand.dateModified);
        }
        done(err);
      });
  });

});