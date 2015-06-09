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
      console.log(req.session);
      return next();
    }
    console.log('not logged in');
    return res.redirect('/');
  }

  function ensureAdminAuthenticated(req,res,next){
    if(req.isAuthenticated()){
      console.log('logged in');
      if (req.session.passport.admin) {
        console.log('logged as admin');
        return next();
      }
    }
    console.log('not logged in at all');
    return res.redirect('/');
  }

  router
    .get('/users/:_id',
         ensureAuthenticated,
         controller.detail)
    .get('/users',
         ensureAdminAuthenticated,
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
    .post('/users',
          controller.createUser,
          controller.setupUserSession)
    .post('/admin/users',
          ensureAdminAuthenticated,
          controller.createAdminUser)
    .post('/login',
          passport.authenticate('local'),
          controller.setupUserSession,
          function(req,res){
            res.json(req.user);
          });


  router.put('/users/:_id',
             ensureAuthenticated,
             controller.update);

  router.delete('/users/:_id',
                ensureAuthenticated,
                controller.delete);

  module.exports = router;
}());
