module.exports.account = class Account{
  constructor(userID,username,password){
    this.userID = userID;
    this.username = username;
    this.password = password;
  }
  getPassword(){
    return this.password;
  }
  setPassword(password){
    this.password = password;
  }
  getUsername(){
    return this.username;
  }
  setUsername(username){
    this.username = username;
  }
  getID(){
    return this.userID;
  }
  setID(uID){
    this.userID = uID;
  }
}
