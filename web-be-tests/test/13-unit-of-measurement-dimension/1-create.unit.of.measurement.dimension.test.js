const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('1-create-unit-of-measurement-dimension', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";

  it('create unit of measurement dimension', function (done) {
    const unitOfMeasureDimension = {
      name: "International System of Units",
      canonicalName: "international_system_of_units",
      abbreviation: "SI",
      description: "International System of Units",
      ownerPartyId: ownerPartyId
    };

    api.post("/unit-of-measurements/unit-of-measurement-dimensions")
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
      .send(unitOfMeasureDimension)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {

        if (!err) {
          expect(res.body.unitOfMeasurementDimensionId).to.not.be.null;
          expect(res.body.version).to.not.equal(null);
          expect(res.body.ownerPartyId).to.not.be.null;
          expect(res.body.dateModified).to.not.equal(null);

          unitOfMeasureDimension.unitOfMeasurementDimensionId = res.body.unitOfMeasurementDimensionId;
          unitOfMeasureDimension.ownerPartyId = res.body.ownerPartyId;
          unitOfMeasureDimension.dateModified = res.body.dateModified;
        }

        done(err);

      });

  });

});