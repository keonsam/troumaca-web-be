const host = 'http://localhost:3000';
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest(host);
const request = require('request');

describe('1-create-unit-of-measurement-system', function () {

  this.timeout(5000);

  const ownerPartyId = "854757a6-8ae3-4a6a-ab41-c29479ad76a9";

  it('create unit of measurement system', function (done) {
    const unitOfMeasureSystem = {
      name: "mass",
      symbol: "L",
      description: "mass",
      ownerPartyId: ownerPartyId
    };

    api.post("/unit-of-measurements/unit-of-measurement-systems")
      .set('Accept', 'application/json')
      .set('Correlation-ID', 1234567890)
      .send(unitOfMeasureSystem)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {

        if (!err) {
          expect(res.body.unitOfMeasurementSystemId).to.not.be.null;
          expect(res.body.version).to.not.equal(null);
          expect(res.body.ownerPartyId).to.not.be.null;
          expect(res.body.dateModified).to.not.equal(null);

          unitOfMeasureSystem.unitOfMeasurementSystemId = res.body.unitOfMeasurementSystemId;
          unitOfMeasureSystem.ownerPartyId = res.body.ownerPartyId;
          unitOfMeasureSystem.dateModified = res.body.dateModified;
        }

        done(err);

      });

  });

});