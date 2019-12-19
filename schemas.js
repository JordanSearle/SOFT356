var mongoose = require("mongoose");
var myId = mongoose.Schema.Types.ObjectId;
//User DB model
var User = mongoose.model("User",{username: String, password: String});
var Game = mongoose.model("Game",{ _id: myId, userOne: String, userTwo: String, gameBoard: [[]], moves: [{}],draw:Boolean});
module.exports.User = User;
module.exports.Game = Game;
