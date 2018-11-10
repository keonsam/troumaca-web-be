var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

const time = new Date().getTime();

let cookie = '';

describe('add-organization-customer', function () {

    this.timeout(5000);

    // it('should be an authenticated credential with status of "AccountActive"', function (done) {
    //     api.post('/authentication/authenticate')
    //         .set('Accept', 'application/json')
    //         .set('correlationId', 1234567890)
    //         .send({
    //             username: "tester1@shapestone.com",
    //             password: "Tester2@user"
    //         })
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .end(function (err, res) {
    //             if (err) {
    //                 console.log(err);
    //             }else {
    //                 expect(res.body.credentialId).to.be.a('string');
    //                 expect(res.body.sessionId).to.be.a('string');
    //                 expect(res.body.partyId).to.be.a('string');
    //                 cookie = `sessionId=${res.body.sessionId}`;
    //                 expect(res.body.authenticateStatus).to.equal('AccountActive');
    //             }
    //
    //             done();
    //         });
    // });

    it('it should add customer organization', function (done) {
        api.post('/organizations/customer')
            .set('Accept', 'application/json')
            .set('Correlation-Id', 1234567890)
            .set('Party-Id', "f8804f17-de6d-11e8-be6c-e1bf76744b52")
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
                } else {
                    expect(res.body.partyId).to.be.a('string');
                }
                done();
            });
    });
});