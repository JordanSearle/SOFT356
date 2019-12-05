const classes = require('../classes/class');
var expect    = require("chai").expect;

var acc = new classes.acc(1,"a_username","a_password");

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
