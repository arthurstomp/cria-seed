(function() {
  'use strict';

  var commonModule = angular.module("CommonModule",['ngResource','ui.router']);

  commonModule.controller("HomeCtrl",function($scope,$state){
    $scope.startClick = function() {
      console.log("start clicked");
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

  commonModule.controller('SessionCtrl',['$scope','$state','sessionService',function($scope,$state,sessionService){
    console.log($state.current);
    if ($state.current.name === "build") {
      console.log("In build state");
      if (!$scope.session) {
        console.log('No session');
        sessionService.get(function(session){
          console.log('callback session service get');
          $scope.session = session;
          if (!$scope.session.cart) {
            $scope.session.cart = {};
          }
        });
      }
    }
  }]);

}());
