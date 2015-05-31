/*jslint node: true */
/*jslint white: true */

(function() {
  'use strict';

  exports.detail = function(req,res){
    if(!req.session.passport.cart){
      req.session.passport.cart = {totalPrice:0};
    }
    console.log(req.session);
    res.json(req.session);

  };

}());
