/*jslint white: true */

(function() {
  'use strict';

  var userModule = angular.module('UserModule');

  /**
  * usersService : Provide all request
  * @constructor
  *
  * @param {object} $resource
  */
  userModule.factory('usersService',['$resource',function($resource){
    var usersActions = {
      'get':{method:'GET'},
      'save': {method: 'POST'},
      'query': {method: 'GET', isArray: true},
      'update': {method: 'PUT'},
      'delete': {method: 'DELETE'}
    },
    db = {};
    db.users = $resource('/api/users/:_id',{},usersActions);
    return db;
  }]);

  /**
  * loginService :
  * @constructor
  *
  * @param {object} $resource
  */
  userModule.factory('loginService',['$resource',function($resource){
    var loginActions = {
      'post':{method:'post'}
    },
    db = {};
    db.login = $resource('/api/login',{},loginActions);
    return db;
  }]);
}());
