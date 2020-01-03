var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var myId = mongoose.Schema.Types.ObjectId;
var Mixed = Schema.Types.Mixed;
//User DB model
var User = mongoose.model("User",{username: String, password: String});
var Game = mongoose.model("Game",{ _id: myId, userOne: String, userTwo: String, gameBoard:{
    type: [[Number]],
    default:[[0,0,0],[0,0,0],[0,0,0]]
  }, moves: {
      type: [{}],
      default: undefined
    },draw:Boolean});
module.exports.User = User;
module.exports.Game = Game;
