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
    )
    .get('/products/:_id',
         controller.detail
    )
    .get('products/categories/:categories',
         controller.listByCategories
    );

  router
    .post('/admin/products',
          controller.create
    );
  router
    .put('/admin/products/:_id',
         controller.update
    );

  router
    .delete('/admin/products/:_id',
            controller.delete
    );

  module.exports = router;
}());
