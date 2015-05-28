/*jslint node: true */
/*jslint white: true */

(function() {
  'use strict';

  function isUserAuthenticated(req,res){
    if (req.isUserAuthenticated()) {
      
    }else{

    }
  }

  exports.detail = function(req,res){
    console.log("***********DETAIL SESSION*************");
    console.log(req.session);

  };

}());
