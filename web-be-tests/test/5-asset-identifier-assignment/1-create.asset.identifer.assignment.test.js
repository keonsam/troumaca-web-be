const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('1-create-asset-identifier-assignment', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";
  const assetCharacteristicId = "01ec3c40-8361-4b2c-8d11-894c55dab2de";

  it('create asset category legal value', function (done) {
    const assetCategoryLegalValue = {
      categoryValue: "Red",
      assetCharacteristicId: assetCharacteristicId,
      ownerPartyId: ownerPartyId
    };

    api.post("/assets/asset-identifier-assignments")
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
      .send(assetCategoryLegalValue)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {

        if (!err) {
          expect(res.body.assetCategoryLegalValueId).to.not.be.null;
          expect(res.body.version).to.not.equal(null);
          expect(res.body.ownerPartyId).to.not.be.null;
          expect(res.body.dateModified).to.not.equal(null);

          assetCategoryLegalValue.assetCategoryLegalValueId = res.body.assetCategoryLegalValueId;
          assetCategoryLegalValue.ownerPartyId = res.body.ownerPartyId;
          assetCategoryLegalValue.dateModified = res.body.dateModified;
        }

        done(err);

      });

  });

});