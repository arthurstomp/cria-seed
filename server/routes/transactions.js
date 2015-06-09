/*jslint node:true */
/*jslint white: true */

(function() {
  'use strict';

  var express = require('express'),
      router = express.Router(),
      controller = require('../app/controllers/transactions.js');

  router
    .post('/transactions',
          controller.create
    );

  module.exports = router;
}());
