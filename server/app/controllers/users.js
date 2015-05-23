/*jslint node: true */

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport');

exports.create = function(req,res){
  var doc = new User(req.body);

  doc.save(function (err) {
    var retObj = {
      meta: {
        "action": "create",
        'timestamp': new Date(),
        filename: __filename
      },
      doc: doc,
      err: err
    };
    return res.send(retObj);
  });
};


exports.login = function(req,res){

  User.getAuthenticated(req.body.email,req.body.password,function(err,user,reason){
    if (err || reason) {
      return res.redirect(401,'/#/login-signup');
    }
    // return res.redirect(200,"/#/users/"+user._id);
  console.log("******login*****");
  var retObj = {
    meta: {
      "action": "login",
      'timestamp': new Date(),
      filename: __filename
    },
    body: user,
    err: err
  };

  return res.send(retObj);
  });
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
