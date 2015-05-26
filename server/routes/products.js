/*jslint node:true */


/** @module Routes for products*/
/** @class */
var express = require('express');
var router = express.Router();

var controller = require('../app/controllers/products.js');

router
.get('/products',
     controller.list
   );

router
.post('/admin/products',
      controller.create
    );

module.exports = router;
