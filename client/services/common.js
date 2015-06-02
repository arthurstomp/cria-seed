/*jslint white: true */

(function() {
  'use strict';
  var commonModule = angular.module('CommonModule');

  commonModule.factory('sessionService',['$resource',function($resource){
    var sessionActions = {
      'get':{method:'GET'},
      'update':{method:'PUT'},
      'delete':{method:'DELETE'},
    };
    return $resource('/api/sessions');
  }]);
}());
