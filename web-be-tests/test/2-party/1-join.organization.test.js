var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

describe('join-organization', function () {


    this.timeout(5000);

    const time = new Date().getTime();

    const credential = {
        username: "tester1" + time + "@shapestone.com",
        password: "Tester2@user"
    };

    const organization = {
        name: `My Company ${time}`,
        purpose: "The Big Bad Company",
        description: "In LA"
    };

    const user = {
        firstName: "Bom",
        lastName: "Bam",
    };

    const confirm = {
        confirmationId: "",
        credentialId: "",
        code: ""
    };

    let cookie;

    let partyId;

    it('join organization 1 credential', function (done) {
        api.post("/authentication/credentials")
            .set('Accept', 'application/json')
            .set('correlationId', 1234567890)
            .send({credential, user})
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (!err) {
                    expect(res.body.status).to.equal("New");
                    console.log("Completed B.");
                    confirm.confirmationId = res.body.confirmationId;
                    confirm.credentialId = res.body.credentialId;
                    confirm.code = res.body.code;
                } else {
                }
                done(err);
            });
    });


    it('join organization 1 confirmation', function (done) {

        console.log("Completed 2.");

        api.post("/authentication/confirmations/verify")
            .set('Accept', 'application/json')
            .set('correlationId', 1234567890)
            .send(confirm)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                console.log(err);
                if (!err) {
                    expect(res.body.status).to.equal("Confirmed")
                }
                done(err);
            });
    });

    it('should be an authenticated credential with status of "AccountConfirmed"', function (done) {
        api.post('/authentication/authenticate')
            .set('Accept', 'application/json')
            .set('correlationId', 1234567890)
            .send(credential)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }
                expect(res.body.credentialId).to.be.a('string');
                expect(res.body.sessionId).to.be.a('string');
                cookie = `sessionId=${res.body.sessionId}`;
                expect(res.body.partyId).to.be.a('string');
                expect(res.body.authenticateStatus).to.equal('AccountConfirmed');
                done();
            });
    });

    it('create profile organization', function (done) {
        api.post("/organizations/profiles")
            .set('Accept', 'application/json')
            .set('correlationId', 1234567890)
            .set('Cookie', [cookie])
            .send(organization)
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }
                expect(res.body.partyId).to.be.a('string');
                partyId = res.body.partyId;
                expect(res.body.name).to.be.a('string');
                expect(res.body.purpose).to.be.a('string');
                done(err);
            });
    });

    it('join profile organization', function (done) {
        api.post("/organizations/request-access")
            .set('Accept', 'application/json')
            .set('correlationId', 1234567890)
            .set('Cookie', [cookie])
            .send({
                accessRequestId: '',
                partyId: '',
                organizationId: partyId
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    expect(res.body.accessRequestId).to.be.a('string');
                    expect(res.body.partyId).to.be.a('string');
                    expect(res.body.organizationId).to.be.a('string');
                }
                done(err);
            });
    });

});