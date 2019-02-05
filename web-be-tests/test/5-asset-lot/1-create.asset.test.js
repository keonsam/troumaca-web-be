const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('1-create-asset-lot', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";

  it('create asset lot', function (done) {

    const lot = {
      name: "Some Product",
      description: "Some Product Description",
      lotNumber: "101019312312",
      numberOfShares: 10,
      ownerPartyId: ownerPartyId
    };

    api.post("/assets/assets")
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
      .send(lot)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {

        if (!err) {
          expect(res.body.assetId).to.not.be.null;
          expect(res.body.version).to.not.equal(null);
          expect(res.body.ownerPartyId).to.not.be.null;
          expect(res.body.dateModified).to.not.equal(null);

          lot.assetId = res.body.assetId;
          lot.ownerPartyId = res.body.ownerPartyId;
          lot.dateModified = res.body.dateModified;
        }

        done(err);

      });

  });

});