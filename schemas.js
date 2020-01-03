var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var myId = mongoose.Schema.Types.ObjectId;
var Mixed = Schema.Types.Mixed;
//User DB model
var User = mongoose.model("User",{username: String, password: String});
var Game = mongoose.model("Game",{ _id: myId, userOne: [{ type: Schema.Types.ObjectId, ref: 'User' }], userTwo: [{ type: Schema.Types.ObjectId, ref: 'User' }], gameBoard:{
    type: [[Number]],
    default:undefined
  }, moves: {
      type: [{}],
      default: undefined
    },draw:Boolean});
module.exports.User = User;
module.exports.Game = Game;
