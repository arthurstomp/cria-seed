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

  router
    .get('/users/:_id',
         controller.ensureAuthenticated,
         controller.detail)
    .get('/users',
         controller.ensureAdminAuthenticated,
         controller.list)
    .get('/logout',
         controller.ensureAuthenticated,
         function(req,res){
           req.session.cookie.expire = false;
           req.logout();
           req.session.passport = {};
           res.redirect('/');
         }
    );

  router
    .post('/users',
          controller.createUser,
          passport.authenticate('local'),
          controller.setupUserSession,
          function(req,res){
            res.json(req.user);
          })
    .post('/admin/users',
          controller.ensureAdminAuthenticated,
          controller.createAdminUser)
    .post('/login',
          passport.authenticate('local'),
          controller.setupUserSession,
          function(req,res){
            res.json(req.user);
          });


  router.put('/users/:_id',
             controller.ensureAuthenticated,
             controller.update);

  router.delete('/users/:_id',
                controller.ensureAuthenticated,
                controller.delete);

  module.exports = router;
}());
