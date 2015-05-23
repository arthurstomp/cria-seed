/*global angular */

(function () {
    "use strict";
    var userModule = angular.module('UserModule');
    // angular.module('myApp.services', ['ngResource']).factory('booksService', ['$resource', '$http',
    //
    //     function ($resource) {
    //         var actions = {
    //                 'get': {method: 'GET'},
    //                 'save': {method: 'POST'},
    //                 'query': {method: 'GET', isArray: true},
    //                 'update': {method: 'PUT'},
    //                 'delete': {method: 'DELETE'}
    //             },
    //             db = {};
    //         // REST url to server
    //         db.books = $resource('/api/books/:_id', {}, actions);
    //         return db;
    //     }]);
    // userModule.service('usersService"',['$http',
    //   function($resource){
    //     // var usersActions = {
    //     //       'get':{method:'GET'},
    //     //       'save': {method: 'POST'},
    //     //       'query': {method: 'GET', isArray: true},
    //     //       'update': {method: 'PUT'},
    //     //       'delete': {method: 'DELETE'}
    //     //     },
    //     //     loginActions = {
    //     //       'post':{method:'GET'}
    //     //     };
    //     // db = {};
    //     // db.users = $resource('/users/:_id',{},actions);
    //     // db.login = $resource('/login');
    //     // return db;
    //     return $http;
    //   }]);
}());
