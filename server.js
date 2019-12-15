var express = require('express');
var mongoose = require("mongoose");
var schemas = require("./schemas");
var app = express();
var bodyParser = require('body-parser');

uri = 'mongodb://localhost/soft355';

app.use(express.static("client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.get("/", function(request, response) {
  response.status(200).sendFile("/", {root: "client"});
});

app.get('/writetodb',function(req,res) {
  var User = schemas.User;
  var newUser = new User({userID:123,username:"test",password:"test"});
  newUser.save(function(err){
    if (err){console.error(err);}
    else{
      console.log("Saved new User");
      res.status(200).send('ok');
    }
  });
//Currently not working I think?
});
app.post('/login',function(req,res) {
  console.log("recieved a Post request");
  var email = req.body.Email;
  var password = req.body.Password;
  res.status(200).send('ok');
});


var server = app.listen(9000, function () {
  // Connect to Mongoose.
  mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then((test) => {
    console.log("%s Connected to DB", new Date());
  });
  var port = server.address().port;
  console.log('%s Listening at port %s', new Date(), port);
});

module.exports = server;
