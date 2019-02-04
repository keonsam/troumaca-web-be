const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('2-update-unit-of-measurement-dimension', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";

  const unitOfMeasurementDimension = {
    name: "Imperial System of units",
    abbreviation: "BG",
    description: "Imperial System of units",
    ownerPartyId: ownerPartyId
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

  it('update unit of measurement dimension', function (done) {
    unitOfMeasurementDimension.description = "British Imperial System of units";
    api.put("/unit-of-measurements/unit-of-measurement-dimensions/" + unitOfMeasurementDimension.unitOfMeasurementDimensionId)
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', unitOfMeasurementDimension.ownerPartyId)
      .send(unitOfMeasurementDimension)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {

        if (!err) {
          expect(res.body.affected).to.be.equal(1);
        }

        done(err);
      });
  });

});