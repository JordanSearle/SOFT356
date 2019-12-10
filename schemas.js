var mongoose = require("mongoose");

//User DB model
var User = mongoose.model("User",{  userID: Number, username: String, password: String});
module.exports.User = User;
