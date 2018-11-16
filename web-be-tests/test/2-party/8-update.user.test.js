var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

let cookie = '';

let user = {};

const credential = {
    password: "Tester2@user"
};

let partyAccessRoles = [];

describe('update-user-profile', function () {

    this.timeout(1000);

    it('should be an authenticated credential with status of "AccountActive"', function (done) {
        api.post('/authentication/authenticate')
            .set('Accept', 'application/json')
            .set('Correlation-Id', 1234567890)
            .send({
                username: "tester1@shapestone.com",
                password: "Tester2@user",
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

    it('it should get user', function (done) {
        api.get('/users/ffc10433-b99e-46cb-a2cf-b8ad0458e908')
            .set('Accept', 'application/json')
            .set('Correlation-Id', 1234567890)
            .set('Cookie', [cookie])
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }else {
                    expect(res.body.user.partyId).to.be.a('string').that.have.lengthOf.above(0);
                    expect(res.body.user.username).to.be.a('string').that.have.lengthOf.above(0);
                    expect(res.body.user.firstName).to.be.a('string').that.have.lengthOf.above(0);
                    expect(res.body.user.lastName).to.be.a('string').that.have.lengthOf.above(0);
                    user = res.body.user;
                    user.lastName = 'Updated';
                    partyAccessRoles = res.body.partyAccessRoles;
                    partyAccessRoles.push({accessRoleId: 'bc40d2b4-1517-4447-9c8d-ed2279a7f7a9'})
                    // write one for party access roles
                }
                done();
            });
    });

    it('it should update be an updated user ', function (done) {
        api.put('/users/ffc10433-b99e-46cb-a2cf-b8ad0458e908')
            .set('Accept', 'application/json')
            .set('Correlation-Id', 1234567890)
            .set('Cookie', [cookie])
            .send({
                user,
                credential,
                partyAccessRoles
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    expect(res.body).to.be.a('number').greaterThan(0);
                }
                done();
            });
    });

    // can't try to update username now because that flow is missing
});