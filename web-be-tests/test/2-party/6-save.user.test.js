var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

const time = new Date().getTime();

let cookie = '';

const user = {
    firstName: 'Tester',
    lastName: 'InvitedUser'
};

const credential = {
    username: "InvitedTester" + time + "@shapestone.com",
};

const partyAccessRoles = [
    { accessRoleId: '8976f2b0-e59b-40bb-a6d6-a55f38255286'},
    { accessRoleId: 'd16f4bdd-0085-4497-a275-a0f4b9fa6a50'},
];

describe('save-user', function () {

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

    it('it should save user', function (done) {
        api.post('/users')
            .set('Accept', 'application/json')
            .set('Correlation-Id', 1234567890)
            .set('Cookie', [cookie])
            .send({
                user,
                credential,
                partyAccessRoles
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }else {
                    expect(res.body.partyId).to.be.a('string');
                }
                done();
            });
    });
});