const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('2-update-asset-brand', function () {

  this.timeout(5000);

  const assetBrand = {
    assetBrandId: null,
    name: "Niva",
    canonicalName: "niva",
    description: "Niva",
    abbreviation: "Niva",
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

  it('update asset brand type', function (done) {
    assetBrand.description = "Nivea for ment";
    api.put("/assets/asset-brands/" + assetBrand.assetBrandId)
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', assetBrand.ownerPartyId)
      .send(assetBrand)
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