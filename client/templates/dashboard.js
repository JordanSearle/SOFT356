var dashModule = angular.module("dash",["ngRoute"]);

dashModule.component("dash",{
  templateUrl:"templates/dashboard.template.html",
  controller: function dashboardController($scope,$http) {
    $scope.signout = function(){
          $http.get('/logout');
    };
    $scope.load = function() {
      $http.get('/dashboard/findGames').then(function(res) {
        $scope.PGames = res.data;
      });
      $http.get('/dashboard/users').then(function (res) {
        $scope.users = res.data;
      });
    }
    $scope.play = function(gameID) {
      $http.get('/game/setup',{params:{gameID:gameID}}).then(function () {
         window.location.href = "/game.html";
      });
    }
    $scope.newGame = function () {
      $http.get('/dashboard/newGame/'+$scope.user)
      $scope.load();
    }
    $scope.load();
  }
})
