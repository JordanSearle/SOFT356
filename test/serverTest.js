var request = require('supertest');
var mongoose = require("mongoose");
var assert = require('assert');

describe('loading express', function () {
  this.timeout(10000);
  var server;
  var uri = 'mongodb://localhost/soft355';
  //Start server before each test
  beforeEach(function () {
    server = require('../server');
      mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
  });
  //Close server after each test
  afterEach(function () {
    server.close();
    mongoose.disconnect();
  });
  it('responds to url/', function(done) {
  request(server)
    .get('/')
    .expect(200, done);
  });
  it('doesnt respond to take url/', function(done) {
    request(server)
      .get('/fakeURL')
      .expect(404, done);
  });
  it('Testing Post login',function(done) {
    request(server)
    .post('/Ulogin')
    .send({Email:'test',Password:'test'})
    .expect(200, done);
  });
  it('Testing incorrect Password',function(done) {
    request(server)
    .post('/Ulogin')
    .send({Email:'test',Password:'password'})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, {
        error: 'Password'
      }, done);
  });
  it('testing logging out', function(done) {
    request(server)
    .get('/logout')
    .expect(200,done);
  });
  it('Testing Account Creation',function(done) {
    request(server)
    .post('/signup')
    .send({Email:'testnew',Password:'test'})
    .expect(200, {
        success: 'Account made successfully'
      }, done);
  });
  it('Testing Account Deletion',function(done) {
    request(server)
    .post('/delAccount')
    .send({Email:'testnew',Password:'test'})
    .expect(200, {
        success: 'Account Deleted'
      }, done);
  });

});
