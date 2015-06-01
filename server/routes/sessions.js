/*jslint node:true */
/*jslint white: true */

(function() {
  'use strict';
  var express = require('express'),
      router = express.Router(),
      controller = require('../app/controllers/sessions.js');

  router.get(
    '/sessions',
    controller.detail
  );

  module.exports = router;

}());
