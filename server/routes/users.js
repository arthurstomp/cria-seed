/*jslint node:true */


/** @module Routes for books */
/** @class */
var express = require('express');
var router = express.Router();

var controller = require('../app/controllers/users.js');
var passport = require('passport');

router
.get('/users/:_id',
      // passport.authenticate('local',{failureRedirect:'/login-',failureFlash:true}),
      controller.detail)
.get('/users',
      // passport.authenticate('local',{failureRedirect:'/',failureFlash:true}),
      controller.list);

router
  .post('/users',controller.create)
  .post('/login',
        // passport.authenticate('local'),
        controller.login);


router.put('/users/:_id',
            // passport.authenticate('local',{failureRedirect:'/',failureFlash:true}),
            controller.update);

router.delete('/users/:_id',
              //  passport.authenticate('local',{failureRedirect:'/',failureFlash:true}),
               controller.delete);

module.exports = router;
