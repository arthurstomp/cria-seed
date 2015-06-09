/*jslint node: true */
/*jslint white: true */
/*globals versatileApp,angular*/

(function() {
  'use strict';

  /**
  * @module UserModule
  * @description Angular module to deal with user views
  *
  * @requires ngResource
  * @requires ui.router
  */

  /** Create module*/
  var userModule = angular.module("UserModule");

  /**
  * @name LoginSignupCtrl
  * @description Handle the login and signup submit actions.
  * @memberof UserModule
  *
  * @function
  * @param $scope {object} -
  * @param $location {object} -
  * @param loginService {object} -
  */
  userModule.controller("LoginSignupCtrl",function($scope,$location,loginService){
    $scope.loginClick = function(user){
      loginService.login.post(
        {username: user.email, password: user.password},
        function(res){
          console.log(res.user);
          // $location.url('/users/'+res.user._id);
        },
        function(err){
          console.log(err);
        });
    };
  });

  /**
  * @name userDetailCtrl
  * @description Populate users detail view with user information
  * @memberof UserModule
  *
  * @function
  * @param $scope {object} -
  * @param usersService {object} -
  */
  userModule.controller("userDetailCtrl",function ($scope,usersService) {
    console.log("userDetailCtrl");
  });
}());
