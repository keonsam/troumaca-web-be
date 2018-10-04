// var should = require('chai').should(),
//     expect = require('chai').expect,
//     supertest = require('supertest'),
//     api = supertest('http://localhost:3000');
//
// describe('authenticate-credential', function () {
//
//   it('should be an authenticated credential', function (done) {
//     api.post('/authenticate')
//       .set('Accept', 'application/json')
//       .set('correlationId', 1234567890)
//       .send({
//         username: "tester1@shapestone.com",
//         password: "Tester2@user "
//       })
//       .expect(200)
//       .end(function (err, res) {
//         console.log(err);
//         console.log(res.body);
//         //expect(res.body.valid).to.equal(true);
//         done();
//       });
//   });
//
// });