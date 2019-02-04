const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('3-delete-asset-brand', function () {

  this.timeout(5000);

  const brandType = {
    assetBrandId: null,
    name: "Jergens",
    canonicalName: "jergens",
    description: "Jergens Lotion",
    abbreviation: "jg",
    ownerPartyId: "854757a6-8ae3-4a6a-ab41-c29479ad76a9",
    dateModified: null,
  };

  beforeEach(function() {
    var options = {
      uri: host + '/assets/asset-brands',
      method: 'POST',
      json: brandType
    };

    return new Promise(resolve => {
      request(options, function (error, response, body) {
        if (!error) {
          brandType.assetBrandId = body.assetBrandId;
          brandType.version = body.version;
          brandType.ownerPartyId = body.ownerPartyId;
          brandType.dateModified = body.dateModified;
        }
        resolve();
      });
    })
  });

  it('delete asset brand type', function (done) {
    api.delete("/assets/asset-brands/" + brandType.assetBrandId)
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', brandType.ownerPartyId)
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