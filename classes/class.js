var mongoose = require("mongoose");
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
  this.gameBoard  = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];
}
  #gameID;
  #userOne;
  #userTwo;
  #gameBoard;
  #moves = [];
//getters/setters etc...
  getGameBoard(a,b){
    return this.gameBoard[a][b];
  }
  setGameBoard(gameBoard){
    this.gameBoard = gameBoard;
  }
  addMove(array,a){
    this.gameBoard[array[0]][array[1]] = a;
  }
  checkWin(){
    //Needs to find which user won as well
      for (var i = 0; i < 2; i++) {
        var b = 0;
        b = this.gameBoard[i][0]+this.gameBoard[i][1]+this.gameBoard[i][2];
        if (b == 15||b == 9) {
          return true;
        }
      }
      for (var i = 0; i < 2; i++) {
        var b = 0;
        b = this.gameBoard[0][i]+this.gameBoard[1][i]+this.gameBoard[2][i];
        if (b == 15||b == 9) {
          return true;
        }
      }
      var b = 0;
      var c = 0;
      b = this.gameBoard[0][0]+this.gameBoard[1][1]+this.gameBoard[2][2];
      c = this.gameBoard[0][2]+this.gameBoard[1][1]+this.gameBoard[2][0];
      if (b == 15|| c == 15||b == 9|| c == 9) {
        return true;
      }
      return false;
      }
}
