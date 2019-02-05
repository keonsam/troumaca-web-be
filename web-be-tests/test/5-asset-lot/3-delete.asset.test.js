const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('3-delete-asset-lot', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";

  const lot = {
    assetId: null,
    name: "Some Product",
    description: "Some Product Description",
    lotNumber: "8745692",
    numberOfShares: 10,
    ownerPartyId: ownerPartyId,
    dateModified: null,
  };

  beforeEach(function() {
    var options = {
      uri: host + '/assets/assets',
      method: 'POST',
      json: lot
    };

    return new Promise(resolve => {
      request(options, function (error, response, body) {
        if (!error) {
          lot.assetId = body.assetId;
          lot.version = body.version;
          lot.ownerPartyId = body.ownerPartyId;
          lot.dateModified = body.dateModified;
        }
        resolve();
      });
    })
  });

  it('delete asset lot', function (done) {
    api.delete("/assets/assets/" + lot.assetId)
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', lot.ownerPartyId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {

        if (!err) {
          expect(res.body.affected).to.be.equal(1);
        }

        done(err);

      });
  })

});