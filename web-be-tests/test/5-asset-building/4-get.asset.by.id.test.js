const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('4-get-building-by-id', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";

  const lot = {
    assetId: null,
    name: "Some Product",
    description: "Some Product Description",
    buildingId: "1593577856",
    ownerPartyId: ownerPartyId,
    dateModified: null,
  };

  beforeEach(function() {
    var options = {
      uri: host + '/assets/assets',
      method: 'POST',
      json: lot
    };

    return new Promise(function(resolve) {
      request(options, function (error, response, body) {
        if (!error) {
          lot.assetId = body.assetId;
          lot.version = body.version;
          lot.ownerPartyId = body.ownerPartyId;
          lot.dateModified = body.dateModified;
        }
        resolve();
      });
    });
  });

  it('get asset building', function (done) {
    api.get("/assets/assets/" + lot.assetId)
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', lot.ownerPartyId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (!err) {
          expect(res.body.assetId).to.be.equal(lot.assetId);
          expect(res.body.name).to.be.equal(lot.name);
          expect(res.body.description).to.be.equal(lot.description);
          expect(res.body.version).to.be.equal(lot.version);
          expect(res.body.dateModified).to.be.equal(lot.dateModified);
        }
        done(err);
      });
  });

});