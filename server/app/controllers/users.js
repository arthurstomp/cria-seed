/*jslint node: true */
/*jslint white: true */



(function() {
  'use strict';
  var mongoose = require('mongoose'),
      User = mongoose.model('User'),
      Product = mongoose.model('Product'),
      passport = require('passport');


  function getUsersCart(username){
    var retCart = {};
    retCart.products = [];
    User.findOne({username: username},function(err,user){
      if(err){
        retCart.err = err;
        return retCart;
      }
      Product
        .find()
        .where('_id')
        .in(user.shoppingCart)
        .exec(function(err,product){
          if (err) {
            retCart.err = err;
          }
          retCart.products.push(products);
        });
      return retCart;
    });
  }

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
          passport.authenticate('local',function (err,user,info) {
            var cart = getUsersCart(user.username);
            retObj.user = user;
            if (cart.err) {
              retObj.err = cart.err;
              return res.json(retObj);
            }
            req.session.cart = products;
            return res.json(retObj);
          })(req,res,next);
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


  exports.login = function(req,res){
    var cart = getUsersCart(user.username),
    retObj = {
      meta: {"action": "login", "timestamp": new Date(), filename: __filename},
      err: {},
    };
    if (cart.err) {
      retObj.err = cart.err;
      return res.json(retObj);
    }
    req.session.cart = cart.products;
    retObj.user = req.user;
    return res.json(retObj);
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
