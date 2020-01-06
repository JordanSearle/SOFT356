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
      var a = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ];
      game.setGameBoard(a);
      game.setUserOne('user1');
      game.setUserTwo('user2');
      game.addMove([0,1],'user1');
      expect(game.getGameBoard(0,1)).to.equal(5)
    })
  })

  context("Testing if board value is 0", function(){
    it('position 0,1 should return false', function() {
      expect(game.isValue([0,2])).to.equal(false);
    })
  })

})
describe('Testing a full Game',function() {
  it('Testing if User 1 will win',function() {
    var a = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];
    game.setUserOne('user1');
    game.setUserTwo('user2');
    game.setGameBoard(a);
    game.addMove([0,0],'user1');
    game.addMove([0,1],'user1');
    game.addMove([0,2],'user1');
    expect(game.checkWin().winner).to.equal('user1');
  });
  it('Testing if User 2 will win',function() {
    var a = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];
    game.setUserOne('user1');
    game.setUserTwo('user2');
    game.setGameBoard(a);
    game.addMove([0,0],'user2');
    game.addMove([0,1],'user2');
    game.addMove([0,2],'user2');

    expect(game.checkWin().winner).to.equal('user2');
  });
  it('Testing diagonal',function() {
    var a = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];
    game.setUserOne('user1');
    game.setUserTwo('user2');
    game.setGameBoard(a);
    game.addMove([0,0],'user1');
    game.addMove([1,0],'user1');
    game.addMove([2,0],'user1');
    expect(game.checkWin().winner).to.equal('user1');
  });
  it('Testing if game has not ended',function() {
    game = new classes.game();
    var a = [
      [5,3,3],
      [3,5,5],
      [3,5,0]
    ];
    game.setGameBoard(a);
    expect(game.checkWin().game).to.equal('continue');
  });
  it('Testing if draw',function() {
    game = new classes.game();
    var a = [
      [5,3,3],
      [3,5,5],
      [3,5,3]
    ];
    game.setGameBoard(a);
    expect(game.checkWin().Gdraw).to.equal(true);
  });
  it('testing DB saving',function() {

  });
})
