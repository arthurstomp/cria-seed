/*jslint white: true */
/*global angular*/

(function() {
  'use strict';

  /**
  * @module CommonModule
  * @requires ngResource
  * @requires ui.router
  * @requires ngCookies
  * @description Module responsible for populate and handle common views as navbar, home and handle the session.
  */

  /** Creates CommonModule */
  var commonModule = angular.module("CommonModule");

  /**
   * @name HomeCtrl
   * @description  Handles the action of the start button.
   * @function
   * @memberof CommonModule
   *
   * @param {object} $scope -
   * @param {object} $state -
   */
  commonModule.controller("HomeCtrl",function($scope,$state){
    $scope.startClick = function() {
      $state.go('build.root');
    };
  });

  /**
   * @name NavbarCtrl
   * @description Provides the data to build the navbar and which one should be activated.
   * @memberof CommonModule
   *
   * @param {object} $scope
   * @param {object} $state
   */
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

  /**
   * @name SessionCtrl
   * @description Request the session information.
   * @memberof CommonModule
   *
   * @param {object} $scope
   * @param {object} $state
   * @param {object} $cookies
   */
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
