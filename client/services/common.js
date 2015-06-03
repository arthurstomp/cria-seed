/*jslint white: true */
/* global angular */

(function() {
  'use strict';
  var commonModule = angular.module('CommonModule');

  /**
  * sessionService : Provide the requests to sessions actions.
  * @constructor
  *
  * @param {object} $resource - 
  *
  */
  commonModule.factory('sessionService',['$resource',function($resource){
    var sessionActions = {
      'get':{method:'GET'},
      'update':{method:'PUT'},
      'delete':{method:'DELETE'},
    };
    return $resource('/api/sessions');
  }]);
}());
