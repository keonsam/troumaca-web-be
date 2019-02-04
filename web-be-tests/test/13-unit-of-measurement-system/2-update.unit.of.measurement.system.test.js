const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('2-update-unit-of-measurement-system', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";

  const unitOfMeasurementSystem = {
    name: "length",
    symbol: "L",
    description: "length",
    ownerPartyId: ownerPartyId
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

  it('update unit of measurement system', function (done) {
    unitOfMeasurementSystem.description = "The retailer";
    api.put("/unit-of-measurements/unit-of-measurement-systems/" + unitOfMeasurementSystem.unitOfMeasurementSystemId)
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
      .set('Owner-Party-ID', unitOfMeasurementSystem.ownerPartyId)
      .send(unitOfMeasurementSystem)
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