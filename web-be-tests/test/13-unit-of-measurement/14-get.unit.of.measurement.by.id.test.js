const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('14-get-unit-of-measurement-by-id', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";

  const unitOfMeasurementDimension = {
    unitOfMeasurementId: null,
    name: "Kelvin",
    symbol: "K",
    description: "Kelvin",
    unitOfMeasureDimensionId: "194cfb2d-ba35-4a78-8961-614321df2e52",
    unitOfMeasureSystemId: "355aa0aa-3afd-47f6-808c-e600c6f18a13",
    ownerPartyId: ownerPartyId,
    dateModified: null,
  };

  beforeEach(function() {
    var options = {
      uri: host + '/unit-of-measurements',
      method: 'POST',
      json: unitOfMeasurementDimension
    };

    return new Promise(function(resolve) {
      request(options, function (error, response, body) {
        if (!error) {
          unitOfMeasurementDimension.unitOfMeasurementId = body.unitOfMeasurementId;
          unitOfMeasurementDimension.version = body.version;
          unitOfMeasurementDimension.ownerPartyId = body.ownerPartyId;
          unitOfMeasurementDimension.dateModified = body.dateModified;
        }
        resolve();
      });
    });
  });

  it('get unit of measurement', function (done) {
    api.get("/unit-of-measurements/" + unitOfMeasurementDimension.unitOfMeasurementId)
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', unitOfMeasurementDimension.ownerPartyId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (!err) {
          expect(res.body.unitOfMeasurementId).to.be.equal(unitOfMeasurementDimension.unitOfMeasurementId);
          expect(res.body.name).to.be.equal(unitOfMeasurementDimension.name);
          expect(res.body.description).to.be.equal(unitOfMeasurementDimension.description);
          expect(res.body.version).to.be.equal(unitOfMeasurementDimension.version);
          expect(res.body.dateModified).to.be.equal(unitOfMeasurementDimension.dateModified);
        }
        done(err);
      });
  });

});