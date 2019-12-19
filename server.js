    var express = require('express');
    var mongoose = require("mongoose");
    var schemas = require("./schemas");
    var classes = require('./classes/class');
    var app = express();
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser');
    var session = require('express-session');

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

    // middleware function to check for logged-in users
    var sessionChecker = (req, res, next) => {
      if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
      } else {
        next();
      }
    };

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
            req.session.user = obj.userID;
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
    });
    app.get('/logout', function(req, res) {
      res.clearCookie('user_sid').sendFile(__dirname + '/client/index.html');
    });

    // route for user's dashboard
    app.get('/dashboard', function(req, res) {
      if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/client/dashboard.html');
      } else {
        res.sendFile(__dirname + '/client/index.html');
      }
    });
      //Creating a new game...
    app.get('/dashboard/newGame/:user1/:user2', function(req,res) {
      var newGame = new classes.game();
      newGame.setUserOne(req.params.user1);
      newGame.setUserTwo(req.params.user2);


      newGame.saveNewGame().then(function(game) {
        res.status(200).redirect('/game/'+game._id);
      });
      //Needs do declaire a new game
      //Then do what ever next
    });
    //Game functions now...
    app.get('/game/:ID',function() {
      //Do stuff
    })

    //Just test code can be removed.
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
