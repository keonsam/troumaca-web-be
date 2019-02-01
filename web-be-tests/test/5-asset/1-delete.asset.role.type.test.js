const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('delete-asset-role-type', function () {

  this.timeout(5000);

  const roleType = {
    assetRoleTypeId: null,
    name: "Wharehouser",
    canonicalName: "wharehouser",
    description: "Wharehouser",
    version: null,
    ownerPartyId: null,
    dateModified: null,
  };

  beforeEach(function() {
    var options = {
      uri: host + '/assets/asset-role-types',
      method: 'POST',
      json: roleType
    };

    return new Promise(resolve => {
      request(options, function (error, response, body) {
        if (!error) {
          roleType.assetRoleTypeId = body.assetRoleTypeId;
          roleType.version = body.version;
          roleType.ownerPartyId = body.ownerPartyId;
          roleType.dateModified = body.dateModified;
        }
        resolve();
      });
    })
  });

  it('delete asset role type', function (done) {

    api.delete("/assets/asset-role-types/" + roleType.assetRoleTypeId)
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
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