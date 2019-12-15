var request = require('supertest');
var mongoose = require("mongoose");
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
  it('Test Writing', function(done) {
    request(server)
      .get('/writetoDB')
      .expect(200, done);
  });
  it('test login',function(done) {
    request(server)
    .post('/login')
    .send({Email:'test',Password:'password'})
    .expect(200, done);

    })
});
