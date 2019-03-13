const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('3-delete-asset-discrete-item', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";

  const discreteItem = {
    assetId: null,
    name: "Some Product",
    description: "Some Product Description",
    serialNumber: "serial number",
    ownerPartyId: ownerPartyId,
    dateModified: null,
  };

  beforeEach(function() {
    var options = {
      uri: host + '/assets/assets',
      method: 'POST',
      json: discreteItem
    };

    return new Promise(resolve => {
      request(options, function (error, response, body) {
        if (!error) {
          discreteItem.assetId = body.assetId;
          discreteItem.version = body.version;
          discreteItem.ownerPartyId = body.ownerPartyId;
          discreteItem.dateModified = body.dateModified;
        }
        resolve();
      });
    })
  });

  it('delete asset discrete item', function (done) {
    api.delete("/assets/assets/" + discreteItem.assetId)
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', discreteItem.ownerPartyId)
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