var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

let cookie = '';

describe('find-organizations', function () {

    this.timeout(1000);

    it('should be an authenticated credential with status of "AccountActive"', function (done) {
        api.post('/authentication/authenticate')
            .set('Accept', 'application/json')
            .set('Correlation-Id', 1234567890)
            .send({
                username: "tester1@shapestone.com",
                password: "Tester2@user"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }else {
                    expect(res.body.credentialId).to.be.a('string');
                    expect(res.body.sessionId).to.be.a('string');
                    expect(res.body.partyId).to.be.a('string');
                    cookie = `sessionId=${res.body.sessionId}`;
                    expect(res.body.authenticateStatus).to.equal('AccountActive');
                }

                done();
            });
    });

    it('it should find all organizations without any search string', function (done) {
        api.get('/organizations/find')
            .set('Accept', 'application/json')
            .set('Correlation-Id', 1234567890)
            .set('Cookie', [cookie])
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }else {
                    expect(res.body).to.be.an('array').that.have.lengthOf.above(0);
                }
                done();
            });
    });

    it('it should find all organizations with any search string', function (done) {
        api.get('/organizations/find?q=My Company&pageSize=15')
            .set('Accept', 'application/json')
            .set('Correlation-Id', 1234567890)
            .set('Cookie', [cookie])
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }else {
                    expect(res.body).to.be.an('array').that.have.lengthOf.above(0);
                }
                done();
            });
    });


});