/*jslint white: true */

(function() {
  'use strict';

  var productModule = angular.module('ProductModule');

  /**
  * productService : Provide all request actions related to products.
  * @constructor
  *
  * @param {object} $resource
  * @param {object} $scope
  * @param {object} $location
  */
  productModule.factory('productService',['$resource',function($scope,$location){
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
    db.userActions = $resource('/api/products/:param',{},productUserActions);
    db.productsByCategory = $resource('/api/products/categories/:category',{},{'get':{method:'GET'}});
    db.adminActions = $resource('/api/products/admin/:id',{},productAdminActions);
    return db;
  }]);
}());
