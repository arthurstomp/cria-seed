/*jslint node: true */
/*jslint white: true */

(function() {
  'use strict';
  var mongoose = require('mongoose'),
      Transaction = mongoose.model('Transaction');
  exports.create = function(req,res){
    Transaction
      .create({
        productId : req.body.productId,
        ownerId : req.body.ownerId,
        customization : req.body.customization,
        position : {
          skeleton : req.body.position.skeleton,
          isFront : req.body.position.isFront,
          x : req.body.position.x,
          y : req.body.position.y,
        },
        amount : req.body.amount,
        soloPrice : req.body.soloPrice,
      },function(err,transaction){
        var retObj = {
          meta : {
            'action': 'create',
            'timestamp': Date.now(),
            filename: __filename,
          },
          err: err,
        };
        if (err) {
          return res.json(retObj);
        }
        retObj.transaction = transaction;
        return res.json(retObj);
      });
  };
}());
