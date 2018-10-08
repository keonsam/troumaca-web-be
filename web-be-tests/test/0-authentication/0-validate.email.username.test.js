var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

const time = new Date().getTime();
describe('validate-username-email', function () {

  it('should be a valid email username without PartyId', function (done) {
      api.post('/authentication/validate-username')
          .set('Accept', 'application/json')
          .send({
              username: `kevin${time}@example.com`,
              partyId: ''
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
              if (err) {
                  console.log(err);
              } else {
                  expect(res.body.valid).to.equal(true);
              }
              done(err);
          });
  });

  it('should be a valid phone without PartyId', function (done) {
        api.post('/authentication/validate-username')
            .set('Accept', 'application/json')
            .send({username: `2133734253`,
                partyId: ''
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    expect(res.body.valid).to.equal(true);
                }
                done(err);
            });
    });

    // these why be dependent on what's in the database

  it('should be a valid email username with a partyId', function (done) {
      api.post('/authentication/validate-username')
          .set('Accept', 'application/json')
          .send({
              username: `test@gmail.com`,
              partyId: 'bd5edb11-1dfc-4c3e-9c5a-e7caff3f1d99'
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
              if (err) {
                  console.log(err);
              } else {
                  expect(res.body.valid).to.equal(true);
              }
              done(err);
          });
  });

  it('should be an invalid email username without PartyId', function (done) {
      api.post('/authentication/validate-username')
          .set('Accept', 'application/json')
          .send({
              username: `test@gmail.com`,
              partyId: ''
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
              if (err) {
                  console.log(err);
              } else {
                  expect(res.body.valid).to.equal(false);
              }
              done(err);
          });
  });

    // you can write one for phone below

});