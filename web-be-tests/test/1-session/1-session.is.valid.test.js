var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

let cookie = '';

describe('session-is-valid', function () {

    this.timeout(1000);

    it('should be an authenticated credential with status of "AccountActive"', function (done) {
        api.post('/authentication/authenticate')
            .set('Accept', 'application/json')
            .set('correlationId', 1234567890)
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

    it('should be an valid session with sessionId', function (done) {
        api.get('/sessions/is-valid-session')
            .set('Accept', 'application/json')
            .set('correlationId', 1234567890)
            .set('Cookie', [cookie])
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }else {
                    expect(res.body.valid).to.be.true;
                    expect(res.body.partyId).to.be.a('string');
                }
                done();
            });
    });

    // fails below

    it('should be an invalid session wrong sessionId', function (done) {
        api.get('/sessions/is-valid-session')
            .set('Accept', 'application/json')
            .set('correlationId', 1234567890)
            .set('Cookie', ['sessionId=f7e4083d-302c-45b5-a90f-8f6f9a825412'])
            .expect('Content-Type', /json/)
            .expect(500)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }
                done();
            });
    });

    it('should be an invalid session no sessionId', function (done) {
        api.get('/sessions/is-valid-session')
            .set('Accept', 'application/json')
            .set('correlationId', 1234567890)
            .set('Cookie', ['sessionId='])
            .expect('Content-Type', /json/)
            .expect(440)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }
                expect(res.body.valid).to.be.false;
                expect(res.body.partyId).to.be.undefined;
                done();
            });
    });

    it('should be an invalid session no cookie', function (done) {
        api.get('/sessions/is-valid-session')
            .set('Accept', 'application/json')
            .set('correlationId', 1234567890)
            .expect('Content-Type', /json/)
            .expect(440)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }
                expect(res.body.valid).to.be.false;
                expect(res.body.partyId).to.be.undefined;
                done();
            });
    });

    // timed functions

    // TODO: write one for less than 20 minutes has passed

    // it('should be an valid session with less than 20 minutes passed', function (done) {
    //     api.get('/sessions/is-valid-session')
    //         .set('Accept', 'application/json')
    //         .set('correlationId', 1234567890)
    //         .set('Cookie', [cookie])
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .end(function (err, res) {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             expect(res.body.valid).to.be.true;
    //             expect(res.body.partyId).to.be.a('string');
    //             done();
    //         });
    // }, 15 * 60000);


    // TODO: write one for after 20 minutes has passed
    // it('should be an invalid session with more than 20 minutes passed', function (done) {
    //     api.get('/sessions/is-valid-session')
    //         .set('Accept', 'application/json')
    //         .set('correlationId', 1234567890)
    //         .set('Cookie', [cookie])
    //         .expect('Content-Type', /json/)
    //         .expect(440)
    //         .end(function (err, res) {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             expect(res.body.valid).to.be.false;
    //             expect(res.body.partyId).to.be.undefined;
    //             done();
    //         });
    // }, 20 * 60000);


});