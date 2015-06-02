/*jslint white: true */

(function() {
  'use strict';

  var productModule = angular.module('ProductModule');

  productModule.factory('productService',['$resource',function($scope,$location,productsService){
    var db, productUserActions, productAdminActions;

    productUserActions = {
      'get':{method: 'GET'},
      'query':{method: 'GET'},
      'query_categories':{method: 'GET'},
    };

    productAdminActions = {
      'save':{method: 'POST'},
      'delete':{method: 'DELETE'},
      'update':{method: 'PUT'},
    };

    db = {};
    db.userActions = $resource('/api/:param',{},productUserActions);
    db.adminActions = $resource('/api/admin/:id',{},productAdminActions);
    return db;
  }]);
}());
