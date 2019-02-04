const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('1-create-asset-characteristic-type', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";

  it('create asset characteristic type', function (done) {
    const assetCharacteristicType = {
      name: "Oracle Arena",
      canonicalName: "oracle_arena",
      description: "Oracle Arena",
      ownerPartyId: ownerPartyId
    };

    api.post("/assets/asset-characteristic-types")
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
      .send(assetCharacteristicType)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {

        if (!err) {
          expect(res.body.assetCharacteristicTypeId).to.not.be.null;
          expect(res.body.version).to.not.equal(null);
          expect(res.body.ownerPartyId).to.not.be.null;
          expect(res.body.dateModified).to.not.equal(null);

          assetCharacteristicType.assetCharacteristicTypeId = res.body.assetCharacteristicTypeId;
          assetCharacteristicType.ownerPartyId = res.body.ownerPartyId;
          assetCharacteristicType.dateModified = res.body.dateModified;
        }

        done(err);

      });

  });

});