const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('4-get-discrete-item-by-id', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";

  const discreteItem = {
    assetId: null,
    name: "Some Product",
    description: "Some Product Description",
    serialNumber: "78963248925",
    ownerPartyId: ownerPartyId,
    dateModified: null,
  };

  beforeEach(function() {
    var options = {
      uri: host + '/assets/assets',
      method: 'POST',
      json: discreteItem
    };

    return new Promise(function(resolve) {
      request(options, function (error, response, body) {
        if (!error) {
          discreteItem.assetId = body.assetId;
          discreteItem.version = body.version;
          discreteItem.ownerPartyId = body.ownerPartyId;
          discreteItem.dateModified = body.dateModified;
        }
        resolve();
      });
    });
  });

  it('get asset discrete item', function (done) {
    api.get("/assets/assets/" + discreteItem.assetId)
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', discreteItem.ownerPartyId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (!err) {
          expect(res.body.assetId).to.be.equal(discreteItem.assetId);
          expect(res.body.name).to.be.equal(discreteItem.name);
          expect(res.body.description).to.be.equal(discreteItem.description);
          expect(res.body.version).to.be.equal(discreteItem.version);
          expect(res.body.dateModified).to.be.equal(discreteItem.dateModified);
        }
        done(err);
      });
  });

});