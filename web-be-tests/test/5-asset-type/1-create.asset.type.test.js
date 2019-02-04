const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('1-create-asset-type', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";

  it('create asset type', function (done) {
    const assetType = {
      name: "Oracle Arena",
      canonicalName: "oracle_arena",
      description: "Oracle Arena",
      ownerPartyId: ownerPartyId
    };

    api.post("/assets/asset-types")
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
      .send(assetType)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {

        if (!err) {
          expect(res.body.assetTypeId).to.not.be.null;
          expect(res.body.version).to.not.equal(null);
          expect(res.body.ownerPartyId).to.not.be.null;
          expect(res.body.dateModified).to.not.equal(null);

          assetType.assetTypeId = res.body.assetTypeId;
          assetType.ownerPartyId = res.body.ownerPartyId;
          assetType.dateModified = res.body.dateModified;
        }

        done(err);

      });

  });

});