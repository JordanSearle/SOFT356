var request = require('supertest');
describe('loading express', function () {
  var server;
  //Start server before each test
  beforeEach(function () {
    server = require('../server');
  });
  //Close server after each test
  afterEach(function () {
    server.close();
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
});