var loginModule = angular.module("login",["ngRoute"]);

loginModule.component("login",{
  templateUrl:"templates/login.template.html",
  controller: function loginController($scope,$http) {
    $scope.initLogin = function() {
      console.log("Starting Login Script");
    }
    $scope.login = function() {
      console.log("login blah blah,.,");
      $http.post("/login",{username:Email,password:Password})
    }
  }
})
