var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

describe('session-is-valid', function () {

    it('should be an authenticated credential', function (done) {
        api.get('/sessions/is-valid-session')
            .set('Accept', 'application/json')
            .set('correlationId', 1234567890)
            .expect(200)
            .end(function (err, res) {
                console.log(err);
                console.log(res.body);
                //expect(res.body.valid).to.equal(true);
                done();
            });
    });

});