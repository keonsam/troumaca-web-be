const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('6-get-asset-role-type-search', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";

  it('get asset role type search', function (done) {
    let query = "ufac";
    api.get('/assets/asset-role-types/search?q=' + query)
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', ownerPartyId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (!err) {
          for (var i = 0; i < res.body.length; i++) {
            expect(res.body[i].name).to.be.contain(query);
            //expect(res.body[i].ownerPartyId).to.be.equal(ownerPartyId);
          }
        }
        done(err);
      });
  });

});