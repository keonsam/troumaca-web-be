var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

describe('validate-username-email', function () {

  it('should be a valid email username', function (done) {
    api.post('/validate-username')
      .set('Accept', 'application/json')
      .send({username: "kevin@example.com"})
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.log(err);
        } else {
          expect(res.body.valid).to.equal(true);
        }

        done(err);
      });
  });

});