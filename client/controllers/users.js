/*jslint node: true */
/*jslint white: true */
/*globals versatileApp,angular*/

(function() {
  'use strict';

  /**
  * UserModule : Angular module to deal with user views
  *
  * Dependencies : ngResource , ui.router
  */
  var userModule = angular.module("UserModule",['ngResource','ui.router']);

  /**
  * LoginSignupCtrl : 
  */
  userModule.controller("LoginSignupCtrl",function($scope,$location,loginService){
    $scope.loginClick = function(user){
      loginService.login.post(
        {username: user.email, password: user.password},
        function(res){
          $location.url('/users/'+res.user._id);
        },
        function(err){
          console.log(err);
        });
      };
    });

  userModule.controller("userDetailCtrl",function ($scope,usersService) {
    console.log("userDetailCtrl");
  });
}());
