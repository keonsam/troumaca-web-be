const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('14-get-asset-characteristic-by-id', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";
  const assetCharacteristicTypeId = "b483402d-d3ef-4a85-b082-72f299c32c3d";
  const unitOfMeasurementId = "53948bd9-bd90-4c36-88ce-c0acd7b91a5c";

  const assetCharacteristic = {
    assetCharacteristicId: null,
    assetCharacteristicTypeId: assetCharacteristicTypeId,
    name: "Rooms",
    description: "Rooms",
    unitOfMeasurementId: unitOfMeasurementId,
    version: null,
    ownerPartyId: ownerPartyId,
    dateModified: null
  };


  beforeEach(function() {
    var options = {
      uri: host + '/assets/asset-characteristics',
      method: 'POST',
      json: assetCharacteristic
    };

    return new Promise(function(resolve) {
      request(options, function (error, response, body) {
        if (!error) {
          assetCharacteristic.assetCharacteristicId = body.assetCharacteristicId;
          assetCharacteristic.version = body.version;
          assetCharacteristic.ownerPartyId = body.ownerPartyId;
          assetCharacteristic.dateModified = body.dateModified;
        }
        resolve();
      });
    });
  });

  it('get asset characteristic', function (done) {
    api.get("/assets/asset-characteristics/" + assetCharacteristic.assetCharacteristicId)
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', assetCharacteristic.ownerPartyId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (!err) {
          expect(res.body.assetCharacteristicId).to.be.equal(assetCharacteristic.assetCharacteristicId);
          expect(res.body.name).to.be.equal(assetCharacteristic.name);
          expect(res.body.description).to.be.equal(assetCharacteristic.description);
          expect(res.body.version).to.be.equal(assetCharacteristic.version);
          expect(res.body.dateModified).to.be.equal(assetCharacteristic.dateModified);
        }
        done(err);
      });
  });

});