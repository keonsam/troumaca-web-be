const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('11-create-unit-of-measurement', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";

  it('create unit of measurement', function (done) {
    const unitOfMeasurement = {
      name: "Meter",
      symbol: "M",
      description: "Meter",
      unitOfMeasureDimensionId: "194cfb2d-ba35-4a78-8961-614321df2e52",
      unitOfMeasureSystemId: "355aa0aa-3afd-47f6-808c-e600c6f18a13",
      ownerPartyId: ownerPartyId
    };

    api.post("/unit-of-measurements")
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
      .send(unitOfMeasurement)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {

        if (!err) {
          expect(res.body.unitOfMeasurementId).to.not.be.null;
          expect(res.body.version).to.not.equal(null);
          expect(res.body.ownerPartyId).to.not.be.null;
          expect(res.body.dateModified).to.not.equal(null);

          unitOfMeasurement.unitOfMeasurementId = res.body.unitOfMeasurementId;
          unitOfMeasurement.ownerPartyId = res.body.ownerPartyId;
          unitOfMeasurement.dateModified = res.body.dateModified;
        }

        done(err);

      });

  });

});