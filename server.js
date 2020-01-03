    var express = require('express');
    var mongoose = require("mongoose");
    var schemas = require("./schemas");
    var classes = require('./classes/class');
    var app = express();
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var expressWs = require('express-ws')(app);




    uri = 'mongodb://localhost:27017/soft355';

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    //Session Details
    // initialize cookie-parser to allow us access the cookies stored in the browser.
    app.use(cookieParser());

    // initialize express-session to allow us track the logged-in user across sessions.
    app.use(session({
      key: 'user_sid',
      secret: 'somerandonstuffs',
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 600000
      }
    }));

    app.use((req, res, next) => {
      if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
      }
      next();
    });



    app.use(express.static("client"));

    app.get("/", function(req, res) {
      res.status(200).sendFile("/", {
        root: "client"
      });
    });

    //Login System
    app.post('/Ulogin', function(req, res) {
      var user = schemas.User;
      var email = req.body.Email;
      var password = req.body.Password;

      user.findOne({
        username: email
      }, function(err, obj) {
        if (err) {
          console.log(err);
          res.status(404).send(err);
        };
        //If user doesn't exist
        if (obj === null) {
          res.status(200).send({
            error: "Username"
          });
        }
        //If it find the item in the DB
        else {
          //if the username matches the password
          if (obj.password == req.body.Password) {
            //res.status(200).send(String(obj.userID));
            //Login Stuff and session processes here.
            req.session.user = obj._id;
            res.status(200).send(String(obj.userID));
          }
          //If the password is incorrect
          else {
            res.status(200).send({
              error: "Password"
            });
          }
        }
      });
    });
    //Acc Deletion
    app.post('/delAccount', function(req, res) {
      if (req.session.user && req.cookies.user_sid) {
        var user = schemas.User;
        var email = req.body.Email;
        var password = req.body.Password;

        user.deleteOne({
          username: email,
          password: password
        }, function(err) {
          if (err) {
            res.status(200).send({
              error: err
            });
          } else {
            res.status(200).send({
              success: 'Account Deleted'
            });
          }
        });
      } else {

        res.sendFile(__dirname + '/client/index.html');
      }
    });
    app.get('/logout', function(req, res) {
      if (req.session.user && req.cookies.user_sid) {
        //Do nothing?
        res.clearCookie('user_sid').sendFile(__dirname + '/client/index.html');
      } else {

        res.sendFile(__dirname + '/client/index.html');
      }
    });

    // route for user's dashboard
    app.get('/dashboard', function(req, res) {
      if (req.session.user && req.cookies.user_sid) {
        //Do nothing?
        res.sendFile(__dirname + '/client/dashboard.html');
      } else {

        res.sendFile(__dirname + '/client/index.html');
      }

    });
      //Creating a new game...
    app.get('/dashboard/newGame/:user1/:user2', function(req,res) {

      if (req.session.user && req.cookies.user_sid) {
        var newGame = new classes.game();
        newGame.setUserOne(req.params.user1);
        newGame.setUserTwo(req.params.user2);
        newGame.saveNewGame().then(function(game) {
          res.sendFile(__dirname + '/client/game.html');
        });
      } else {

        res.sendFile(__dirname + '/client/index.html');
      }

    });

    app.get('/dashboard/findGames',function(req,res) {
      var game = schemas.Game;
      game.find({$or:[{userOne: req.session.user},{userTwo:req.session.user}]}, function(err, games) {
        if(err) console.log(err);
        var gameMap = [];

        games.forEach(function(lgame) {
          gameMap.push({'game':lgame});
        });

      res.send(gameMap);
    });

    })
    //Game functions now...
    app.ws('/game/move', function(ws, req) {
      ws.on('message', function(msg) {
        //Get Input (GameID,user, Move)
        var input = JSON.parse(msg);

          var game = new classes.game();
          game.setID(req.session.gameID);

          var dbGame = schemas.Game;
           dbGame.findOne({_id:game.getID()},function(err,obj) {
            if(err)console.error(err);
            game.setID(obj._id);
            game.setUserOne(obj.userOne);
            game.setUserTwo(obj.userTwo);
            game.setMoves(obj.moves);
            game.setGameBoard(obj.gameBoard);
            game.setDraw(obj.draw);
            game.addMove(input.pos,input.value,input.user);
            var check = game.checkWin();
            obj.moves = game.getMoves();
            obj.gameBoard = game.rtngameBoard();
            obj.draw = game.getDraw();
            obj.markModified('gameBoard');
            obj.markModified('moves');
            obj.save();
            var output = {board:game.rtngameBoard(),draw:game.getDraw(),winner:check};
             ws.send(JSON.stringify(output));
          })

          //game.addMove(input.pos,input.value,input.user);
        //Return update
      });
    });

    app.ws('/game/update', function(ws, req) {
      ws.on('message', function(msg) {
        //Get Input (GameID,user, Move)
        var input = JSON.parse(msg)
        //Update DB
          var game = new classes.game();
          game.setID(req.session.gameID);
          var dbGame = schemas.Game;
           dbGame.findOne({_id:game.getID()},function(err,obj) {
            if(err)console.error(err);
            game.setID(obj._id);
            game.setUserOne(obj.userOne);
            game.setUserTwo(obj.userTwo);
            game.setGameBoard(obj.gameBoard);
            game.setMoves(obj.moves);
            game.setDraw(obj.draw);
            var check = game.checkWin();
            var output = {board:game.rtngameBoard(),draw:game.getDraw(),winner:check};
             ws.send(JSON.stringify(output));
          })
          /**game.setID(test._id);
          game.setUserOne(test.userOne);
          game.setUserTwo(test.userTwo);
          game.setGameBoard(test.gameBoard);
          game.setMoves(test.moves);
          game.setDraw(test.draw);**/
        //Return update

      });
    });
    //Start Game 
    app.get('/game/setup',function(req,res) {
      var gameID = req.query.gameID;
      //init game and return
      req.session.gameID = gameID;
        res.sendFile(__dirname + '/client/game.html');
    })

    app.post('/signup', function(req, res) {
      var user = schemas.User;
      var newUser = new user({
        userID: 123123,
        username: req.body.Email,
        password: req.body.Password
      });
      newUser.save(function(err) {
        if (err) {
          res.status(200).send({
            error: err
          });
        } else {
          res.status(200).send({
            success: 'Account made successfully'
          });
        }
      });

    });



    //Server Start...
    var server = app.listen(9000, function() {
      // Connect to Mongoose.
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then((test) => {
        console.log("%s Connected to DB", new Date());
      });
      var port = server.address().port;
      console.log('%s Listening on port %s', new Date(), port);
    });

    module.exports = server;
