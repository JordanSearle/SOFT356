var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.status(200).send('ok');
});

var server = app.listen(9000, function () {
  var port = server.address().port;
  console.log('%s Listening at port %s', new Date(), port);
});

module.exports = server;
