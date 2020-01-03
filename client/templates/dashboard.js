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
    }
    $scope.play = function(gameID) {
      $http.get('/game/setup',{params:{gameID:gameID}}).then(function (res) {

      })
    }
    $scope.load();
  }
})
