/*jslint node:true */
/*jslint white: true */


(function () {
    "use strict";

    /**
     * Module dependencies.
     * @type {exports}
     */
    var fs = require('fs'),
        express = require('express'),
        bodyParser = require("body-parser"),
        env = process.env.NODE_ENV || 'development',
        config = require('./config/config.js')[env],
        mongoose = require('mongoose'),
        session = require('express-session'),
        MongoStore = require('connect-mongo')(session),
        models_path = __dirname + '/app/models',
        model_files,
        app = express(),
        passport = require("passport"),
        LocalStrategy = require('passport-local').Strategy,
        User,
        routes_path = __dirname + '/routes',
        route_files;

    /**
     * Bootstrap db connection
     * @type {exports}
     */
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
    model_files = fs.readdirSync(models_path);
    model_files.forEach(function (file) {
        require(models_path + '/' + file);
    });

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
     * Middleware to handle session
     */
    User = mongoose.model("User");
    passport.use(new LocalStrategy(User.authenticate()));
    app.use(session({
      secret: 'RAWR!!!!',
      store: new MongoStore({ mongooseConnection: mongoose.connection,
                              autoRemove: 'native',
                              ttl: 24 * 60 * 60,
                            })
    }));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    app.use(passport.initialize());
    app.use(passport.session());

    /**
     * Bootstrap routes
     * @type {string}
     */
    route_files = fs.readdirSync(routes_path);
    route_files.forEach(function (file) {
        var route = require(routes_path + '/' + file);                  // Get the route
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

    module.exports = app;

}());
