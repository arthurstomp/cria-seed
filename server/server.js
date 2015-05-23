/*jslint node:true */
/*jslint white: true */

(function () {
    "use strict";

    /**
     * Module dependencies.
     * @type {exports}
     */
    var fs = require('fs'),                              // Used to read files from the filesystem (__dirname)
        express = require('express'),                    // Fast, unopinionated, minimalist web framework for Node.js
        bodyParser = require("body-parser"),             // This does not handle multipart bodies, due to their complex and typically large nature. For multipart bodies, you may be interested in the following modules:
        // mongodb = require("mongodb"),                 // Not being used, said JSLint.
        mongoose = require("mongoose"),
        // session = require('express-session'),         // Not being used, said JSLint.
        // mongooseSession = require('mongoose-session'),// Not being used, said JSLint.
        cookieParser = require('cookie-parser'),      // Not being used, said JSLint.
        passport,
        LocalStrategy,
        User,
        env,
        config,
        models_path,
        model_files,
        app,
        routes_path,
        route_files;

    /**
     * Load configuration
     * @type {*|string}
     */
    env = process.env.NODE_ENV || 'development';
    config = require('./config/config.js')[env];

    /**
     * Bootstrap db connection
     * @type {exports}
     */
    mongoose = require('mongoose');
    mongoose.connect(config.db);

    /**
     * Debugging
     */
    console.log(config.debug);

    mongoose.connection.on('error', function (err) {
        console.error('MongoDB error: %s', err);
    });
    mongoose.set('debug', config.debug);                                // takes value from config.js

    /**
     * Bootstrap models
     * @type {string}
     */
    models_path = __dirname + '/app/models';
    model_files = fs.readdirSync(models_path);
    model_files.forEach(function (file) {
        require(models_path + '/' + file);
    });

    /**
     * Use express
     * @type {*}
     */
    app = express();
    /**
     * Express settings
     */
    app.set('port', process.env.PORT || config.port);                   // Set the port

    /**
     * Express middleware
     */
    app.use(bodyParser.json());                                         // Configure body-parser with JSON input
    app.use(bodyParser.urlencoded({extended: true}));                   // Notice because option default will flip in next major; http://goo.gl/bXjyyz

    /**
     * Middleware to enable logging
     */
    if (config.debug) {
        app.use(function (req, res, next) {
            console.log('%s %s %s', req.method, req.url, req.path);
            next();                                                    // Required to continue
        });
    }

    /**
     * Bootstrap routes
     * @type {string}
     */
    routes_path = __dirname + '/routes';
    route_files = fs.readdirSync(routes_path);
    route_files.forEach(function (file) {
        var route = require(routes_path + '/' + file);                  // Get the route
        console.log("loading route");
        app.use('/api', route);
    });
    /**
     * Middleware to serve static page
     */
    app.use(express.static(__dirname + '/../client/'));

    /**
     * Middleware to catch all unmatched routes
     */
    app.all('*', function (req, res) {
        res.sendStatus(404);
    });

    /**
    * Middleware to handle authentications
    */
    User = mongoose.model("User");
    passport = require("passport");
    LocalStrategy = require('passport-local').Strategy;
    passport.use(
      // {usernameField: 'user.email',
      // passwordField: 'user.password'},
      new LocalStrategy(function (username,password,done) {
        console.log("Local Strategy");
        User.getAuthenticated(username,password,function(err,user,reason){
          if (err) {
            throw err;
          }

          if(user){
            console.log("Successful Login");
            return done(null,user);
          }

          var reasons = User.failedLogin;
          switch (reasons) {
            case reasons.NOT_FOUND:
              return done(null, false, {message:'User not found'});
            case reason.PASSWORD_INCORRECT:
              return done(null, false, {message:'Incorrect password'});
            case reasons.MAX_ATTEMPTS:
              return done(null, false, {message:'You exceded the attempts for login. Try again later'});
            default:
              return node(null,false,{message:'We dont know what happened, but your login failed.'});

          }
        });
      }
    ));

    app.use(cookieParser);
    app.use(require('express-session')({
      key: 'session',
      secret: 'RAWR!!!!',
      store: require('mongoose-session')(mongoose),
      cookie: {
        httpOnly: true, maxAge: 3600000,
      },
    }));
    app.use(passport.initialize());
    app.use(passport.session());



    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });

    module.exports = app;

}());
