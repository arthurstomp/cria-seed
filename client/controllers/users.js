/*jslint node: true */
/*jslint white: true */
/*globals versatileApp,angular*/

(function() {
  'use strict';
  var userModule = angular.module("UserModule",['ngResource','ui.router','ngCookies']);

  userModule.controller("LoginSignupCtrl",function($scope,$location,$cookieStore,loginService){

    $scope.stringfyArray = function(array,separator){
      var retStr = "";
      separator = separator ? separator : " ";
      array.forEach(function(elem){
        retStr += elem.toString();
        retStr += separator;
      });
      return retStr;
    };

    $scope.loginForm = [
      {
        label : {
          id: 'login-email-label',
          class: ['pull-right'],
          value: 'Email',
        },
        input : {
          id : 'login-email-input',
          type : 'email',
          class : ['form-control'],
          placeholder : 'Enter your email',
        },
      },
      {
        label : {
          id: 'login-password-label',
          class: ['pull-right'],
          value: 'Password',
        },
        input : {
          id : 'login-password-input',
          type : 'password',
          class : ['form-control'],
          placeholder : 'Enter your password',
        },
      },
    ];

    $scope.signupForm = [
      {
        label : {
          id : 'signup-name-label',
          class : ['pull-left'],
          value : 'Name',
        },
        input : {
          id : 'signup-name-input',
          type : 'text',
          class : ['form-control'],
          placeholder : 'Enter your name',
        },
      },
      {
        label : {
          id : 'signup-email-label',
          class : ['pull-left'],
          value : 'Email',
        },
        input : {
          id : 'signup-email-input',
          type : 'email',
          class : ['form-control'],
          placeholder : 'Enter you email',
        },
      },

      {
        label : {
          id : 'signup-password-label',
          class : ['pull-left'],
          value : 'Password',
        },
        input : {
          id : 'signup-password-input',
          type : 'password',
          class : ['form-control'],
          placeholder : 'Enter you password',
        },
      },

      {
        label : {
          id : 'signup-confirm-password-label',
          class : ['pull-left'],
          value : 'Confirm password',
        },
        input : {
          id : 'signup-confirm-password-input',
          type : 'password',
          class : ['form-control'],
          placeholder : 'Confirm you password',
        },
      },
    ];

    $scope.clickRegister = function(user){
      console.log("register user");
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
