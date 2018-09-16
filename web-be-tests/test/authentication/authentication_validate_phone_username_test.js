var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

describe('validate-phone-username', function () {

  it('should be a invalid phone username', function (done) {
    // api.post('/validate-username')
    api.post('/authentication/validate-username')
      .set('Accept', 'application/json')
      .send({username: "19998887777"})
      .expect(200)
      .end(function (err, res) {
        expect(res.body.valid).to.equal(false);
        done();
      });
  });

  it('should be a valid phone username', function (done) {
    // api.post('/validate-username')
    api.post('/authentication/validate-username')
      .set('Accept', 'application/json')
      .send({username: "13104335751"})
      .expect(200)
      .end(function (err, res) {
        expect(res.body.valid).to.equal(true);
        done();
      });
  });

});