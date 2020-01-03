var gameModule = angular.module("game",["ngRoute"]);

gameModule.component("game",{
  templateUrl:"templates/game.template.html",
  controller: function dashboardController($scope,$http) {
    var canvas = document.getElementById("canvas");
    function loadArr() {
      var ws = new WebSocket("ws://localhost:9000/game/update");
      ws.onopen = function() {
               // Web Socket is connected, send data using send()
          ws.send(JSON.stringify({id: "5e008fff9ad0c72bbc35efb9"}));
          //Update Baord on message recieve
          ws.onmessage = function (event) {
            drawBoard(event.data);
            var data = JSON.parse(event.data);

            if (data.check.hasOwnProperty("winner")) {
              $scope.winner = data.check.winner;
              //$scope.apply();
              console.log(data.check.winner);
              canvas.removeEventListener('mousedown',click);
            }
            else if(data.check.hasOwnProperty("draw")){
            //drawBoard(event.data);
            console.log(data.check.draw);
            canvas.removeEventListener('mousedown',click);
            }
          }
    };
    }
    function drawBoard(store){
      // Box width
    var bw = 300;
    // Box height
    var bh = 300;
    // Padding
    var p = 10;
    var temp = JSON.parse(store).board;


    var context = canvas.getContext("2d");
        for (var x = 100; x <= bw-100; x += 100) {
            context.moveTo(x, 0);
            context.lineTo(x, bh);

        }

        for (var x = 100; x <= bh-100; x += 100) {
            context.moveTo(0, x);
            context.lineTo(bw, x);
        }
        context.strokeStyle = "black";
        context.stroke();
        for (var i = 100; i < 301; i+=100) {
          for (var j = 100; j < 301; j+=100) {
            var a = (i/100)-1;
            var b = (j/100)-1;
            switch (temp[a][b]) {
              case 5:
              //Set Position
              //Draw X
              context.font = "110px Arial";
                context.fillText("X", (j-100)+p, i-p);

                break;
              case 3:
              //SetPos
              //Draw O
              context.fillText("0", (j-100)+15, i-p);
                break;
              default:
              //Do nothing / wipe...
            }

          }
        }
    }


    function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        return [Math.floor(y/100),Math.floor(x/100)];
    }

    canvas.addEventListener('mousedown', click);
    function click(event) {
      var arr =  getCursorPosition(canvas, event);
      $scope.move(arr);
    }

    $scope.load = function() {
      loadArr();
    }
    $scope.move = function(array) {
      var ws = new WebSocket("ws://localhost:9000/game/move");
      ws.onopen = function() {
               // Web Socket is connected, send data using send()
          ws.send(JSON.stringify({
            pos:array
          }));
          //Update Baord on message recieve
          ws.onmessage = function (event) {
            console.log(event.data);
            var output = JSON.parse(event.data);
            if (output.draw == true) {
              //canvas.removeEventListener('mousedown', click(e));
            }
            loadArr();
          }
    };
    }
    setInterval(function () {
      loadArr();
    }, 5000);
    $scope.load();
  }
})
