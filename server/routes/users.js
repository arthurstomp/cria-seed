/*jslint node:true */
/*jslint white: true */

(function() {
  'use strict';
  /** @module Routes for books */
  /** @class */
  var express = require('express'),
      router = express.Router(),
      controller = require('../app/controllers/users.js'),
      passport = require('passport');

  function ensureAuthenticated(req,res,next){
    if (req.isAuthenticated()){
      console.log('logged in');
      return next();
    }
    console.log('not logged in');
    return res.redirect('/');
  }

  function ensureAdminAuthenticated(req,res,next){
    if(req.isAuthenticated()){
      console.log('logged in');
    }
  }

  router
    .get('/users/:_id',
         ensureAuthenticated,
         controller.detail)
    .get('/users',
         ensureAuthenticated,
    controller.list)
    .get('/logout',
         ensureAuthenticated,
         function(req,res){
           req.session.cookie.expire = false;
           req.logout();
           res.send();
         }
    );

  router
    .post('/users',controller.createUser)
    .post('/login',
          passport.authenticate('local'),
          controller.login);


  router.put('/users/:_id',
             ensureAuthenticated,
             controller.update);

  router.delete('/users/:_id',
                ensureAuthenticated,
                controller.delete);

  module.exports = router;
}());
