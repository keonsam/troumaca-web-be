var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

describe('customer-search', function () {

  it('should be a valid search', function (done) {
      api.get('/search/customers')
      .set('Accept', 'application/json')
      .set('Correlation-Id', 1234567890)
      .set('Owner-Party-Id', "ca791f07-df3b-11e8-ae31-7f8efaa3396f")
      .set('Party-Id', "f8804f17-de6d-11e8-be6c-e1bf76744b52")
      .query({name: "Added"})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        //expect(res.body.valid).to.equal(true);
        console.log(res.body);
        done();
      });
  });

});