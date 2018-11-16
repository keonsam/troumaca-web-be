var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

let cookie = '';

describe('get-users', function () {

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

    it('it should get users', function (done) {
        api.get('/users?pageNumber=1&pageSize=10&sortOrder=asc')
            .set('Accept', 'application/json')
            .set('Correlation-Id', 1234567890)
            .set('Cookie', [cookie])
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }else {
                    expect(res.body.users).to.be.an('array').that.have.lengthOf.above(0);
                    expect(res.body.page).to.exist;
                    expect(res.body.sort).to.exist;
                    expect(res.body.page.items).to.be.a('number');
                    expect(res.body.page.totalItems).to.be.a('number');
                }
                done();
            });
    });
});