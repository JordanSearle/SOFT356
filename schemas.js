var mongoose = require("mongoose");

//User DB model
var User = mongoose.model("user",{userID: userID, username: username, password: password});
module.exports.User = User;

var Game = mongoose.model("Game",{
  gameID: gameID,
  userOne: userOne,
  userTwo: userTwo
  ///Blah Blah
});
