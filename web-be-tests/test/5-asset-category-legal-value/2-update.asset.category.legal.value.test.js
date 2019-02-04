const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('2-update-asset-category-legal-value', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";
  const assetCharacteristicId = "01ec3c40-8361-4b2c-8d11-894c55dab2de";

  const assetCategoryLegalValue = {
    categoryValue: "Blue",
    assetCharacteristicId: assetCharacteristicId,
    ownerPartyId: ownerPartyId
  };


  beforeEach(function() {
    var options = {
      uri: host + '/assets/asset-category-legal-values',
      method: 'POST',
      json: assetCategoryLegalValue
    };

    return new Promise(function(resolve) {
      request(options, function (error, response, body) {
        if (!error) {
          assetCategoryLegalValue.assetCategoryLegalValueId = body.assetCategoryLegalValueId;
          assetCategoryLegalValue.version = body.version;
          assetCategoryLegalValue.ownerPartyId = body.ownerPartyId;
          assetCategoryLegalValue.dateModified = body.dateModified;
        }
        resolve();
      });
    });
  });

  it('update asset asset category legal value', function (done) {
    assetCategoryLegalValue.description = "Nivea for ment";
    api.put("/assets/asset-category-legal-values/" + assetCategoryLegalValue.assetCategoryLegalValueId)
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', assetCategoryLegalValue.ownerPartyId)
      .send(assetCategoryLegalValue)
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