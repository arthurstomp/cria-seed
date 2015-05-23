/*jslint node:true */


/** @module Routes for books */
/** @class */
var express = require('express');
var router = express.Router();

var controller = require('../app/controllers/users.js');
var passport = require('passport');

function ensureAuthenticated(req,res,next){
  if (req.isAuthenticated())
    return next();
  else{
    res.redirect('/');
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
        req.logout();
      });

router
  .post('/users',controller.create)
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
