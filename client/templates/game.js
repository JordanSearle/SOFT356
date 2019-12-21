var gameModule = angular.module("game",["ngRoute"]);

gameModule.component("game",{
  templateUrl:"templates/game.template.html",
  controller: function dashboardController($scope,$http) {
    $scope.load = function() {
      $http.get('/dashboard/temp').then(function(res) {
        $scope.PGames = res.data;
      });
    }
    $scope.move = function() {
      var ws = new WebSocket("ws://localhost:9000/game/move");
      console.log("clicked");
      ws.onopen = function() {
               // Web Socket is connected, send data using send()
          ws.send(JSON.stringify({
            //Game ID
            id: "5dfb68bfd3319a259ca27d12",
            //Position move was made
            pos:[1,1],
            value:5,
            //user will be the user
            user:'5df0e9232d725a37088465c4'
          }));
          //Update Baord on message recieve
          ws.onmessage = function (event) {
            console.log(event.data);
          }
    };
    }
    setInterval(function () {
      //var ws = new WebSocket("ws://localhost:9000/game/update");
      var ws = new WebSocket("ws://localhost:9000/game/update");
      ws.onopen = function() {
               // Web Socket is connected, send data using send()
          ws.send(JSON.stringify({id: "5dfb68bfd3319a259ca27d12"}));
          //Update Baord on message recieve
          ws.onmessage = function (event) {
            console.log(event.data);
          }
    };
    }, 5000);
    $scope.load();
  }
})
