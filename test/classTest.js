const classes = require('../classes/class');
var expect    = require("chai").expect;

var acc = new classes.account();
var game = new classes.game();

describe('account class',function() {
  context("Testing getter/setters for Password", function(){
    it('should have a password of 123password', function() {
      acc.setPassword("123password");
      expect(acc.getPassword()).to.equal("123password")
    })
  })

  context("Testing getter/setters for Username", function(){
    it('should have a username of aNewUsername', function() {
      acc.setUsername("aNewUsername");
      expect(acc.getUsername()).to.equal("aNewUsername")
    })
  })

  context("Testing getter/setters for userID", function(){
    it('should have a ID of 123abc456', function() {
      acc.setID("123abc456");
      expect(acc.getID()).to.equal("123abc456")
    })
  })
})
describe('game class testing',function() {
  context("Testing board Array to equal 0", function(){
    it('position 0,0 equals 0', function() {
      expect(game.getGameBoard(1,1)).to.equal(0)
    })
  })
  context("Testing board Array setting", function(){
    it('position 1,1 equals 5', function() {
      var a = [
        [0,0,0],
        [0,5,0],
        [0,0,0]
      ];
      game.setGameBoard(a);
      expect(game.getGameBoard(1,1)).to.equal(5)
    })
  })

  context("Testing board addMove function", function(){
    it('position 0,1 should now equal 5', function() {
      game.addMove([0,1],5)
      expect(game.getGameBoard(0,1)).to.equal(5)
    })
  })
})
