/*jslint node: true */
/*jslint node:true */

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
                 'timestamp': Date.now,
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
  sort = {'modificationDate': -1};
  Product
    .find(conditions,fields)
    .sort(sort)
    .exec(function (err,products){
      if(err) throw err;
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
