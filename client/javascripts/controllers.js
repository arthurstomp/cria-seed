/*jslint node: true */
/*jslint white: true */
/*globals versatileApp*/

var commonModule = angular.module("CommonModule",[]);

commonModule.controller("HomeCtrl",function($scope,$state){
  $scope.introTxt = "merda";
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
  }
});
