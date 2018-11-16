// TODO: write the code for this one. A hard one

// const should = require('chai').should(),
//     expect = require('chai').expect,
//     supertest = require('supertest'),
//     api = supertest('http://localhost:3000');
//
// const mocks = require('node-mocks-http');
//
// const checkSession = require('../../../src/middleware/check-session');
//
// let cookie = '';
//
// describe('session-is-valid', function () {
//
//     it('should be an authenticated credential with status of "AccountActive"', function (done) {
//         api.post('/authentication/authenticate')
//             .set('Accept', 'application/json')
//             .set('Correlation-Id', 1234567890)
//             .send({
//                 username: "tester1@shapestone.com",
//                 password: "Tester2@user"
//             })
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .end(function (err, res) {
//                 if (err) {
//                     console.log(err);
//                 }
//                 expect(res.body.credentialId).to.be.a('string');
//                 expect(res.body.sessionId).to.be.a('string');
//                 expect(res.body.partyId).to.be.a('string');
//                 cookie = `sessionId=${res.body.sessionId}`;
//                 expect(res.body.authenticateStatus).to.equal('AccountActive');
//                 done();
//             });
//     });
//
//
//
//     const req = mocks.createRequest();
//     const res = mocks.createResponse();
//     it('should be an authenticated credential', function (done) {
//         api.get('/sessions/is-valid-session')
//             .set('Accept', 'application/json')
//             .set('correlationId', 1234567890)
//             .expect(200)
//             .end(function (err, res) {
//                 console.log(err);
//                 console.log(res.body);
//                 //expect(res.body.valid).to.equal(true);
//                 done();
//             });
//     });
//
// });