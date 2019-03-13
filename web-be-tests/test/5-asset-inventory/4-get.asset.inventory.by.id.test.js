const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('4-get-asset-inventory-by-id', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";

  const inventory = {
    assetId: null,
    name: "Some Product",
    description: "Some Product Description",
    inventoryId: "1593577856",
    quantity: 10,
    ownerPartyId: ownerPartyId,
    dateModified: null,
  };

  beforeEach(function() {
    var options = {
      uri: host + '/assets',
      method: 'POST',
      json: inventory
    };

    return new Promise(function(resolve) {
      request(options, function (error, response, body) {
        if (!error) {
          inventory.assetId = body.assetId;
          inventory.version = body.version;
          inventory.ownerPartyId = body.ownerPartyId;
          inventory.dateModified = body.dateModified;
        }
        resolve();
      });
    });
  });

  it('get asset inventory', function (done) {
    api.get("/assets/" + inventory.assetId)
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', inventory.ownerPartyId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (!err) {
          expect(res.body.assetId).to.be.equal(inventory.assetId);
          expect(res.body.name).to.be.equal(inventory.name);
          expect(res.body.description).to.be.equal(inventory.description);
          expect(res.body.version).to.be.equal(inventory.version);
          expect(res.body.dateModified).to.be.equal(inventory.dateModified);
        }
        done(err);
      });
  });

});