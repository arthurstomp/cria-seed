/*jslint node: true */
/*jslint white: true */

(function() {
  'use strict';
  var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  passport = require('passport');

  exports.create = function(req,res){
    User.register(new User({ username : req.body.username,
      password:req.body.password,
      name: req.body.name || "Little Fucker",
      admin: req.body.admin || false}),
      req.body.password,
      function(err, user) {
        var retObj = {
          meta: {"action": "create", "timestamp": new Date(), filename: __filename},
          err: err
        };
        if (err) {
          retObj.err = err;
          return res.json(retObj);
        }
        passport.authenticate('local')(req, res, function () {
          retObj.user = req.user;
          return res.json(retObj);
        });
      });
    };


    exports.login = function(req,res){
      console.log('************LOGIN********');
      req.session.passport.user_id = req.user._id;
      console.log(req.session);
      var user = {user: req.user};
      return res.json(user);
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
        return res.send(retObj);
      });
    };

    exports.list = function(req,res){
      var conditions, fields, sort;

      conditions = {};
      fields = {};
      sort = {'modificationDate': -1};

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

        return res.send(retObj);

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
