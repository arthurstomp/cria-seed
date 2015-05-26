/*jslint node:true */
/*jslint white: true */

(function() {
  'use strict';
  /** @module Routes for products*/
  /** @class */
  var express = require('express'),
      router = express.Router(),
      controller = require('../app/controllers/products.js');

router
  .get('/products',
  controller.list
  );

router
  .post('/admin/products',
  controller.create
  );

module.exports = router;
}());
