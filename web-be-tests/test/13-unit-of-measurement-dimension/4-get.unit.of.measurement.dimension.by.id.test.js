const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('4-get-unit-of-measurement-dimension-by-id', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";

  const unitOfMeasurementDimension = {
    unitOfMeasurementDimensionId: null,
    name: "English Engineering System of Units",
    abbreviation: "English",
    description: "English Engineering System of Units",
    ownerPartyId: ownerPartyId,
    dateModified: null,
  };

  beforeEach(function() {
    var options = {
      uri: host + '/unit-of-measurements/unit-of-measurement-dimensions',
      method: 'POST',
      json: unitOfMeasurementDimension
    };

    return new Promise(function(resolve) {
      request(options, function (error, response, body) {
        if (!error) {
          unitOfMeasurementDimension.unitOfMeasurementDimensionId = body.unitOfMeasurementDimensionId;
          unitOfMeasurementDimension.version = body.version;
          unitOfMeasurementDimension.ownerPartyId = body.ownerPartyId;
          unitOfMeasurementDimension.dateModified = body.dateModified;
        }
        resolve();
      });
    });
  });

  it('get unit of measurement dimension', function (done) {
    api.get("/unit-of-measurements/unit-of-measurement-dimensions/" + unitOfMeasurementDimension.unitOfMeasurementDimensionId)
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', unitOfMeasurementDimension.ownerPartyId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (!err) {
          expect(res.body.unitOfMeasurementDimensionId).to.be.equal(unitOfMeasurementDimension.unitOfMeasurementDimensionId);
          expect(res.body.name).to.be.equal(unitOfMeasurementDimension.name);
          expect(res.body.description).to.be.equal(unitOfMeasurementDimension.description);
          expect(res.body.version).to.be.equal(unitOfMeasurementDimension.version);
          expect(res.body.dateModified).to.be.equal(unitOfMeasurementDimension.dateModified);
        }
        done(err);
      });
  });

});