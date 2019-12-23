var mongoose = require("mongoose");
var schemas = require("../schemas");
var myId = mongoose.Types.ObjectId();
module.exports.account = class Account{
    #userID;
    #username;
    #password;
  getPassword(){
    return this.#password;
  }
  setPassword(password){
    this.#password = password;
  }
  getUsername(){
    return this.#username;
  }
  setUsername(username){
    this.#username = username;
  }
  getID(){
    return this.#userID;
  }
  setID(uID){
    this.#userID = uID;
  }
}

module.exports.game = class Game{
//constructor...
constructor(){
  this.#gameBoard  = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];
  this.#moves = new Array();
}
  #gameID;
  #userOne;//X
  #userTwo;//O
  #gameBoard;
  #moves = [];
  #draw;
//getters/setters etc...
  setID(id){
    this.#gameID = id;
  }
  getID(){
    return this.#gameID;
  }
  getGameBoard(a,b){
    return this.#gameBoard[a][b];
  }
  setGameBoard(gameBoard){
    this.#gameBoard = gameBoard;
  }
  rtngameBoard(){
    return this.#gameBoard;
  }
  setUserOne(user){
    this.#userOne = user;
  }
  getUserOne(){
    return this.#userOne;
  }
  setUserTwo(user){
    this.#userTwo = user;
  }
  getUserTwo(){
    return this.#userTwo;
  }
  setMoves(moves){
    this.#moves = moves;
  }
  getMoves(){
    return this.#moves;
  }
  setDraw(draw){
    this.#draw = draw
  }
  getDraw(){
    return this.#draw;
  }
  addMove(arr,move,user){
    this.#gameBoard[arr[0]][arr[1]] = move;
    //Add move to moves array
    this.#moves.push({user: user,move:move,pos:arr});
  }
  isValue(arr){
    if ( this.#gameBoard[arr[0]][arr[1]]==0) {
      return false;
    }
    else{
      return true;
    }
  }

  checkWin(){
    //Needs to find which user won as well
    //Also needs to find out if its a draw
    //Check each value
    //Check if each row/column/diagonal is a winner (return winner:userThatWon)
    //if all values are filled and no winner (return draw:true);

    //First: check for draw possibility
    this.#draw = true;
    loop:
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        //Loops through all positions, if a square == 0 then a draw is impossible (Last position must be filled in case of draw)

        if (this.isValue([i,j])==false) {
          this.#draw = false;
          break loop;
        }
      }
    }
    //Second: Check for a win
    //If A player has won then return player that won
    for (var i = 0; i < 2; i++) {
      var b = 0;
      b = this.#gameBoard[i][0]+this.#gameBoard[i][1]+this.#gameBoard[i][2];
      if (b == 15) {
        return {winner:this.#userOne};
      }
      else if (b == 9) {
        return {winner:this.#userTwo};
      }
    }
    for (var i = 0; i < 2; i++) {
      var b = 0;
      b = this.#gameBoard[0][i]+this.#gameBoard[1][i]+this.#gameBoard[2][i];
      if (b == 15) {
        return {winner:this.#userOne};
      }
      else if (b == 9) {
        return {winner:this.#userTwo};
      }
    }
    var b = 0;
    var c = 0;
    b = this.#gameBoard[0][0]+this.#gameBoard[1][1]+this.#gameBoard[2][2];
    c = this.#gameBoard[0][2]+this.#gameBoard[1][1]+this.#gameBoard[2][0];
    if (b == 15) {
      return {winner:this.#userOne};
    }
    else if (b == 9) {
      return {winner:this.#userTwo};
    }
    else if (c == 15) {
      return {winner:this.#userOne};
    }
    else if (c == 9) {
      return {winner:this.#userTwo};
    }

    //Third: if win != true and all squares are filled return draw, else continue

    if (this.#draw == true) {
      return {Gdraw:true};
    }
    else{
      return {game:'continue'};
    }
  }
  //save game to Db and return
  async saveNewGame(){
    //var Game = mongoose.model("Game",{  gameID: Number, userOne: String, userTwo: String, gameBoard: [[]], moves: [{}],draw:Boolean});
    var game = new schemas.Game({ _id: myId, userOne: this.#userOne,userTwo: this.#userTwo, gameboard:this.#gameBoard, moves:this.#moves, draw:this.#draw});
    await game.save((err, userDoc) => {
        if (err) console.log(err);
    });
    return game;
  }
  getGame(){
    //var Game = mongoose.model("Game",{  gameID: Number, userOne: String, userTwo: String, gameBoard: [[]], moves: [{}],draw:Boolean});
    var out = {};
    var dbGame = schemas.Game;
     dbGame.findOne({_id:this.#gameID},function(err,obj) {
      if(err)console.error(err);
      out = obj;
      console.log(obj);
      console.log(out);
    })
    console.log(out);
  }
}
