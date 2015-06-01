/*jslint node: true */
/*jslint white: true */
/*globals versatileApp,angular*/

(function() {
  'use strict';
  var userModule = angular.module("UserModule",['ngResource','ui.router','ngCookies']);

  userModule.controller("LoginSignupCtrl",function($scope,$location,$cookieStore,loginService){
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

  userModule.controller("userDetailCtrl",function ($scope,usersService) {
    console.log("userDetailCtrl");
  });
}());
