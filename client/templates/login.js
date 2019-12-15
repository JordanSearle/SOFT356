var loginModule = angular.module("login",["ngRoute"]);

loginModule.component("login",{
  templateUrl:"templates/login.template.html",
  controller: function loginController($scope,$http) {
    $scope.initLogin = function() {
      console.log("Starting Login Script");
    }
    $scope.login = function() {
        $http.post('http://localhost:9000/login',$scope.formData).
         then(function(response) {
             console.log(response);
         }).catch(function(response) {
             console.error(response.data+" error in posting");
         })
    }
  }
})
