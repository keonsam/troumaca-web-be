const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('11-create-asset-characteristic', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";
  const assetCharacteristicTypeId = "b483402d-d3ef-4a85-b082-72f299c32c3d";

  it('create asset characteristic', function (done) {
    const assetCharacteristic = {
      assetCharacteristicTypeId: "b483402d-d3ef-4a85-b082-72f299c32c3d",
      name: "Quantify Per",
      unitOfMeasurementId: "53948bd9-bd90-4c36-88ce-c0acd7b91a5c",
      description: "Quantify Per",
      ownerPartyId: ownerPartyId
    };

    api.post("/assets/asset-characteristics")
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
      .send(assetCharacteristic)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {

        if (!err) {
          expect(res.body.assetCharacteristicId).to.not.be.null;
          expect(res.body.version).to.not.equal(null);
          expect(res.body.ownerPartyId).to.not.be.null;
          expect(res.body.dateModified).to.not.equal(null);

          assetCharacteristic.assetCharacteristicId = res.body.assetCharacteristicId;
          assetCharacteristic.ownerPartyId = res.body.ownerPartyId;
          assetCharacteristic.dateModified = res.body.dateModified;
        }

        done(err);

      });

  });

});