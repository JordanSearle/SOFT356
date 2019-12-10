var request = require('supertest');
var mongoose = require("mongoose");
describe('loading express', function () {
  this.timeout(10000);
  var server;
  //Start server before each test
  beforeEach(function () {
    server = require('../server');
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
  it('Test Writing', function(done) {
    request(server)
      .get('/writetoDB')
      .expect(200, done);
  });
});
