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
}
