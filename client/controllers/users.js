/*jslint node: true */
/*jslint white: true */
/*globals versatileApp,angular*/

(function() {
  'use strict';
  var userModule = angular.module("UserModule",['ngResource','ui.router','ngCookies']);

  userModule.controller("LoginSignupCtrl",function($scope,$location,$cookieStore,loginService,usersService){

    $scope.user = {};
    $scope.newUser = {};

    $scope.signupClick = function(newUser){
      console.log("register user");
      console.log(newUser);
      usersService.users.save(
        {name: newUser.name,
         username: newUser.email,
         password: newUser.password,
         confirmPassword: newUser.confirmPassword,
        },
        function(res){
          console.log(res.user);
        },
        function(err){
          console.log(err);
        }
      );
    };

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
