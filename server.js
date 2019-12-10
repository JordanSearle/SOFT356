var express = require('express');
var mongoose = require("mongoose");
var app = express();

uri = 'mongodb://localhost/soft355';

app.get('/', function (req, res) {
  res.status(200).send('ok');
});
app.get('/writetoDB',function(req,res) {
  var db = mongoose.connection;
  db.once('open', function() {

      var User = mongoose.model("User",{  userID: Number, username: String, password: String});
      var newUser = new User({userID:123,username:"test",password:"test"});
      newUser.save(function(err){
        if (err) console.error(err);
        console.log("Saved student");
      });
  });
//Currently not working
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
