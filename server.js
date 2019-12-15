var express = require('express');
var mongoose = require("mongoose");
var schemas = require("./schemas");
var app = express();
var bodyParser = require('body-parser');


uri = 'mongodb://localhost:27017/soft355';

app.use(express.static("client"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.get("/", function(request, response) {
  response.status(200).sendFile("/", {root: "client"});
});

//Just test code can be removed.
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
//Login System
app.post('/login',function(req,res) {
  var user = schemas.User;
  var email = req.body.email;
  var password = req.body.password;
  console.log(email +' ' + password);

  user.findOne({username: email}, function(err,obj) {
    if(err) {console.log(err);res.status(404).send("Failed To connect to Database");};
    if(obj===null){res.status(200).send("Failed to FInd values");}
    else{
      //Needs to  be chaged for session values... but can be done later.
    console.log(obj);
    res.status(200).send(obj);
  }
  });
});

//Server Start...
var server = app.listen(9000, function () {
  // Connect to Mongoose.
  mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then((test) => {
    console.log("%s Connected to DB", new Date());
  });
  var port = server.address().port;
  console.log('%s Listening on port %s', new Date(), port);
});

module.exports = server;
