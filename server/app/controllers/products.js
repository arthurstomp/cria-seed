/*jslint node: true */
/*jslint white: true */

(function() {
  'use strict';
  var mongoose = require('mongoose'),
  Product = mongoose.model('Product');

  exports.create = function(req,res){
    Product
    .create({name: req.body.name,
      description: req.body.description,
      soloPrice: req.body.soloPrice,
      categories: req.body.categories,
    },
    function(err,product){
      var resObj = {
        meta : {
          'action': 'create',
          'timestamp': Date.now(),
          filename: __filename,
        },
        err: err,
        product: product,
      };
      return res.json(resObj);
    });
  };

  exports.list = function(req,res){
    var conditions, sort, fields;
    conditions = {};
    fields = {};
    sort = {'updatedAt': -1};
    Product
    .find(conditions,fields)
    .sort(sort)
    .exec(function (err,products){
      if(err) {throw err;}
      var retObj = {
        meta: {
          'action': 'list',
            'timestamp': Date.now,
          filename: __filename,
        },
        products : products,
        err : err,
      };
      return res.json(retObj);
    });
  };

  exports.detail = function (req,res) {
    var conditions,fields;

    conditions = {
      _id: req.params._id
    };
    fields = {};

    Product
      .findOne(conditions,fields)
      .exec(function(err,product){
        var retObj =
        {
          meta: {
            action: 'detail',
            timestamp: Date.now(),
            filename: __filename,
          },
          product: product,
          err: err,
        };
        return res.json(retObj);
      });
  };

  exports.update= function (req,res) {
    var conditions,update,options;

    update = {};

    /**
    * Note : This update will overwrite subProducts and categories.
    */
    /*
    * TODO : Find a nice way to write specifications and update them into product.
    * maybe use text area and write the specifications in json?
    */
    if(req.body.name){ update.name = req.body.name;}
    if(req.body.description){ update.description = req.body.description;}
    if(req.body.soloPrice){ update.soloPrice = req.body.soloPrice;}
    if(req.body.subProducts){ update.subProducts = req.body.subProducts;}
    if(req.body.specification){ update.specification = req.body.specification;}
    if(req.body.categories){ update.categories = req.body.categories;}

    conditions={
      _id: req.params._id
    };

    options = {multi:false, runValidators:true};

    Product.findOneAndUpdate(conditions,update,options,function(err,product){
      var retObj = {
        meta: {
          'action': 'update',
          'timestamp': Date.now(),
          filename: __filename,
        },
        err: err,
        product: product,
      };
      return res.json(retObj);
    });
  };

  exports.delete = function (req,res) {
    var conditions;

    conditions = {_id: req.params._id};
    Product.remove(conditions,function(err,product){
      var retObj = {
        meta: {
          'action': 'delete',
          'timestamp': Date.now(),
          filename: __filename,
        },
        err: err,
        product: product,
      };
      return res.json(retObj);
    });
  };

  exports.listByCategories = function (req,res) {
    var categories;
    categories = req.params.categories.split(",");
    Product
      .find()
      .where('categories', {$elemMatch: {$in:categories}})
      .sort({'updatedAt':-1})
      .exec(function(err,products){
        var retObj = {
          meta: {
            'action': 'find_by_category',
            'timestamp': Date.now(),
            filename: __filename,
          },
          err: err,
          product: products,
        };
        return res.json(retObj);
      });
  };
}());