var dashModule = angular.module("dash",["ngRoute"]);

dashModule.component("dash",{
  templateUrl:"templates/dashboard.template.html",
  controller: function dashboardController($scope,$http) {
    $scope.signout = function(){
          $http.get('/logout');
    };
    $scope.load = function() {
      $http.get('/dashboard/temp').then(function(res) {
        $scope.PGames = res.data;

      });

    }
    $scope.load();
  }
})
