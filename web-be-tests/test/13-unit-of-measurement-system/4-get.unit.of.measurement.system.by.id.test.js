const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('4-get-unit-of-measurement-system-by-id', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";

  const unitOfMeasurementSystem = {
    unitOfMeasurementSystemId: null,
    name: "temperature",
    symbol: "T",
    description: "temperature",
    ownerPartyId: ownerPartyId,
    dateModified: null,
  };

  beforeEach(function() {
    var options = {
      uri: host + '/unit-of-measurements/unit-of-measurement-systems',
      method: 'POST',
      json: unitOfMeasurementSystem
    };

    return new Promise(function(resolve) {
      request(options, function (error, response, body) {
        if (!error) {
          unitOfMeasurementSystem.unitOfMeasurementSystemId = body.unitOfMeasurementSystemId;
          unitOfMeasurementSystem.version = body.version;
          unitOfMeasurementSystem.ownerPartyId = body.ownerPartyId;
          unitOfMeasurementSystem.dateModified = body.dateModified;
        }
        resolve();
      });
    });
  });

  it('get unit of measurement system', function (done) {
    api.get("/unit-of-measurements/unit-of-measurement-systems/" + unitOfMeasurementSystem.unitOfMeasurementSystemId)
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', unitOfMeasurementSystem.ownerPartyId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (!err) {
          expect(res.body.unitOfMeasurementSystemId).to.be.equal(unitOfMeasurementSystem.unitOfMeasurementSystemId);
          expect(res.body.name).to.be.equal(unitOfMeasurementSystem.name);
          expect(res.body.description).to.be.equal(unitOfMeasurementSystem.description);
          expect(res.body.version).to.be.equal(unitOfMeasurementSystem.version);
          expect(res.body.dateModified).to.be.equal(unitOfMeasurementSystem.dateModified);
        }
        done(err);
      });
  });

});