const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('create-asset-role-type', function () {

  this.timeout(5000);

  it('create asset role type', function (done) {
    const assetRoleType = {
      name: "Retailer",
      canonicalName: "retailer",
      description: "Retailer"
    };

    api.post("/assets/asset-role-types")
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
      .send(assetRoleType)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {

        if (!err) {
          expect(res.body.assetRoleTypeId).to.not.be.null;
          expect(res.body.version).to.not.equal(null);
          expect(res.body.ownerPartyId).to.not.be.null;
          expect(res.body.dateModified).to.not.equal(null);

          assetRoleType.assetRoleTypeId = res.body.assetRoleTypeId;
          assetRoleType.ownerPartyId = res.body.ownerPartyId;
          assetRoleType.dateModified = res.body.dateModified;
        }

        done(err);

      });

  });

});