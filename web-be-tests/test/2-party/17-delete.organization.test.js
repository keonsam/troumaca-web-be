var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

const time = new Date().getTime();

let cookie = '';

let partyId = '';

describe('delete-user', function () {

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

    it('it should save organization', function (done) {
        api.post('/organizations')
            .set('Accept', 'application/json')
            .set('Correlation-Id', 1234567890)
            .set('Cookie', [cookie])
            .send({
                name: `Added Company ${time}`,
                purpose: 'to test the add company api'
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }else {
                    expect(res.body.partyId).to.be.a('string');
                    partyId = res.body.partyId;
                }
                done();
            });
    });

    it('it should delete an organization', function (done) {
        api.delete(`/organizations/${partyId}`)
            .set('Accept', 'application/json')
            .set('Correlation-Id', 1234567890)
            .set('Cookie', [cookie])
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }else {
                    expect(res.body).to.be.a('number').above(0);
                }
                done();
            });
    });


});