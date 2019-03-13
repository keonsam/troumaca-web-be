const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('1-create-asset-structure', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";

  it('create asset structure', function (done) {
    const assetIdentifierType = {
      name: "Oracle Arena",
      canonicalName: "oracle_arena",
      description: "Oracle Arena",
      ownerPartyId: ownerPartyId
    };

    api.post("/assets/asset-structures")
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
      .send(assetIdentifierType)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {

        if (!err) {
          expect(res.body.assetIdentifierTypeId).to.not.be.null;
          expect(res.body.version).to.not.equal(null);
          expect(res.body.ownerPartyId).to.not.be.null;
          expect(res.body.dateModified).to.not.equal(null);

          assetIdentifierType.assetIdentifierTypeId = res.body.assetIdentifierTypeId;
          assetIdentifierType.ownerPartyId = res.body.ownerPartyId;
          assetIdentifierType.dateModified = res.body.dateModified;
        }

        done(err);

      });

  });

});