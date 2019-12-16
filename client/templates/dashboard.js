var dashModule = angular.module("dash",["ngRoute"]);

dashModule.component("dash",{
  templateUrl:"templates/dashboard.template.html",
  controller: function dashboardController($scope,$http) {
    $scope.signout = function(){
          $http.get('/logout');
        }
      }
})
