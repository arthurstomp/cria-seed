/*jslint white: true */
/*global angular*/

(function() {
  'use strict';

  var commonModule = angular.module("CommonModule",['ngResource','ui.router','ngCookies']);

  commonModule.controller("HomeCtrl",function($scope,$state){
    $scope.startClick = function() {
      $state.go('build');
    };
  });

  commonModule.controller("NavbarCtrl",function($scope,$state){
    $scope.logoImgName = "logo.jpg";
    if ($state.current.name === "build") {
      $scope.navbarOptions = [
        {linkRoute:"build", text:"Build", isActive:"active"},
        {linkRoute:"cart", text:"Cart", isActive:""},
        {linkRoute:"loginSignup", text:"Login/Signup",isActive:""},
      ];
    }else if ($state.current.name === "cart") {
      $scope.navbarOptions = [
        {linkRoute:"build", text:"Build", isActive:""},
        {linkRoute:"cart", text:"Cart", isActive:"active"},
        {linkRoute:"loginSignup", text:"Login/Signup",isActive:""},
      ];
    }else if ($state.current.name === "loginSignup") {
      $scope.navbarOptions = [
        {linkRoute:"build", text:"Build", isActive:""},
        {linkRoute:"cart", text:"Cart", isActive:""},
        {linkRoute:"loginSignup", text:"Login/Signup",isActive:"active"},
      ];
    }else {
      $scope.navbarOptions = [
        {linkRoute:"build", text:"Build", isActive:""},
        {linkRoute:"cart", text:"Cart", isActive:""},
        {linkRoute:"loginSignup", text:"Login/Signup",isActive:""},
      ];
    }
  });

  commonModule.controller('SessionCtrl',['$scope','$state','$cookies','sessionService',function($scope,$state,$cookies,sessionService){
    if ($state.current.name !== "home" && $state.current.name !== '') {
      if (!$cookies.getObject('cart')) {
        sessionService.get(function(session){
          var now = new Date(),
              expireDate = now.setHours(now.getHours()+24);
          $cookies.putObject('cart',session.passport.cart,{'expires': new Date(expireDate)});
        });
      }
    }
  }]);

}());
