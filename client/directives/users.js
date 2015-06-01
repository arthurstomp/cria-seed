/*jslint node: true */
/*jslint white: true */
/*globals versatileApp,angular*/
(function() {
  'use strict';
  var userModule = angular.module('UserModule');

  userModule.directive('confirmpassword',function(){
    return {
      restrict: 'A',
      require: 'ngModel',
      link : function (scope,elem,attr,ctrl){
        ctrl.$validators.confirmpassword = function(modelValue, viewValue){
          if (scope.signupForm.password.$viewValue === scope.signupForm.confirmPassword.$viewValue) {
            return true;
          }else{
            return false;
          }
        };
      }
    };
  });
}());
