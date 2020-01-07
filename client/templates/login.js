var loginModule = angular.module("login",["ngRoute"]);

loginModule.component("login",{
  templateUrl:"templates/login.template.html",
  controller: function loginController($scope,$http) {
    $(".collapsible").click(function() {
      $(".content").toggle();
    })
    $scope.login = function() {
        $http.post('http://localhost:9000/Ulogin',$scope.loginData).
         then(function(response) {
           //Checking if the login was sucessful
           if (!response.data.hasOwnProperty('error')) {
             //Alert
             $('body').append( '<div class="alert alert-success" role="alert">Success!<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>' );
             window.location.href = "/dashboard";
           }
           //If unsucessful
           else{
             switch (response.data.error) {
               case 'Password':
                $( "#passGroup" ).append( '<div class="alert alert-danger" role="alert">Error Incorrect Password!<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>' );
                 break;
               case 'Username':
                 $( "#userGroup" ).append( '<div class="alert alert-danger" role="alert">Error Incorrect Username!<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>' );
              break;
            }
           }

         }).catch(function(response) {
             console.error(response.data+" error in posting");
         })
    };

    $scope.signup = function() {
      $http.post('http://localhost:9000/signup',$scope.cAccData).
      then(function(res) {
        if (!res.data.hasOwnProperty('error')) {
          //Alert
          $('body').append( '<div class="alert alert-success" role="alert">Account Made Successfully!<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>' );
        }
        else{
          $( 'body' ).append( '<div class="alert alert-danger" role="alert">Error Creation Unsuccesful!<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>' );
        }
      });
    };
  }
})
