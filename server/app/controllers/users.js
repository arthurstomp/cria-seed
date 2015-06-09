/*jslint node: true */
/*jslint white: true */



(function() {
  'use strict';
  var mongoose = require('mongoose'),
      User = mongoose.model('User'),
      Product = mongoose.model('Product'),
      passport = require('passport');

  exports.ensureAuthenticated = function(req,res,next){
    if (req.isAuthenticated()){
      console.log('logged in');
      console.log(req.session);
      return next();
    }
    console.log('not logged in');
    return res.redirect('/');
  };

  exports.ensureAdminAuthenticated = function(req,res,next){
    if(req.isAuthenticated()){
      console.log('logged in');
      if (req.session.passport.admin) {
        console.log('logged as admin');
        return next();
      }
    }
    console.log('not logged in at all');
    return res.redirect('/');
  };

  exports.setupUserSession = function(req,res,next){
    if (!req.user) {
      return next();
    }
    req.session.passport.admin = req.user.admin;
    req.session.passport.userId = req.user._id;
    if (!req.session.cart) {
      req.session.cart = {
        skeleton : {},
        front : [],
        back : [],
      };
    }
    mongoose
      .model('Transaction')
      .find()
      .where('_id')
      .in(req.user.shoppingCart.skeleton)
      .in(req.user.shoppingCart.front)
      .in(req.user.shoppingCart.back)
      .exec(function(err,transactions){
        transactions.forEach(function(transaction){
          if(!req.session.cart){
            req.session = {};
          }
          if(transaction.position.skeleton){
            req.session.cart.skeleton = transaction;
          }else if (transaction.position.isFront) {
            if (!req.session.cart.front) {
              req.session.cart.front = [];
            }
            req.session.cart.front.push(transaction);
          }else{
            if (!req.session.cart.back) {
              req.session.cart.back = [];
            }
            req.session.cart.back.push(transaction);
          }
        });
        console.log(req.session);
        next();
      });
  };

  function userCreation(req,res,next,admin){
    var retObj = {
      meta: {"action": "create", "timestamp": new Date(), filename: __filename},
      err: {},
    };
    if (req.body.password === req.body.confirmPassword) {
      User.register(new User({ username : req.body.username,
        name: req.body.name || "Little Fucker",
        admin: admin}),
        req.body.password,
        function(err, user) {
          if (err) {
            res.status(400);
            retObj.err = err;
            return res.json(retObj);
          }
          return next();
          // passport.authenticate('local',function (err,user,info) {
          //   retObj.user = user;
          //   return res.json(retObj);
          // })(req,res,next);
        });
    }else{
      res.status(400);
      retObj.err.message = 'Passwords don\'t match';
      return res.json(retObj);
    }
  }

  exports.createUser = function(req,res,next){
    userCreation(req,res,next,false);
  };

  exports.createAdminUser = function(req,res,next){
    userCreation(req,res,next,true);
  };

  exports.detail = function(req,res){
    var conditions, fields;

    conditions = {_id: req.params._id};
    fields = {};

    console.log("detail called");

    User
    .findOne(conditions, fields)
    .exec(function (err, doc) {
      var retObj = {
        meta: {"action": "detail", 'timestamp': new Date(), filename: __filename},
        doc: doc, // only the first document, not an array when using "findOne"
        err: err
      };
      return res.json(retObj);
    });
  };

  exports.list = function(req,res){
    var conditions, fields, sort;

    console.log("*******LIST USERS******");
    conditions = {};
    fields = {};
    sort = {'created_at': -1};

    User
    .find(conditions, fields)
    .sort(sort)
    .exec(function (err, doc) {

      var retObj = {
        meta: {
          "action": "list",
          'timestamp': new Date(),
          filename: __filename
        },
        doc: doc, // array
        err: err
      };

      return res.json(retObj);

    });
  };

  exports.update = function(req,res){
    var conditions =
    {_id: req.params._id},
    update = {
      title: req.body.doc.title || '',
      author: req.body.doc.author || '',
      description: req.body.doc.description || ''
    },
    options = {multi: false, runValidators: true},
    callback = function (err, doc) {
      var retObj = {
        meta: {
          "action": "update",
          'timestamp': new Date(),
          filename: __filename,
          'doc': doc,
          'update': update
        },
        doc: update,
        err: err
      };

      return res.send(retObj);
    };

    User
    .findOneAndUpdate(conditions, update, options, callback);
  };

  exports.delete = function(req,res){
    var conditions, callback, retObj;
    req.logout();
    conditions = {_id: req.params._id};
    callback = function (err, doc) {
      retObj = {
        meta: {
          "action": "delete",
          'timestamp': new Date(),
          filename: __filename
        },
        doc: doc,
        err: err
      };
      return res.send(retObj);
    };

    User.remove(conditions, callback);
  };
}());
