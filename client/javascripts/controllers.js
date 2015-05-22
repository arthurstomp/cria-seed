/*jslint node: true */
/*jslint white: true */
/*globals versatileApp*/


var commonModule = angular.module("CommonModule",[]),
    userModule = angular.module("UserModule",['ngResource','ui.router']);

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

userModule.factory('usersService',['$resource',function($resource){
  var usersActions = {
        'get':{method:'GET'},
        'save': {method: 'POST'},
        'query': {method: 'GET', isArray: true},
        'update': {method: 'PUT'},
        'delete': {method: 'DELETE'}
      },
  db = {};
  db.users = $resource('/api/users/:_id',{},usersActions);
  return db;
}]);
userModule.factory('loginService',['$resource',function($resource){
  var loginActions = {
    'post':{method:'post'}
  },
  db = {};
  db.login = $resource('/api/login',{},loginActions);
  return db;
}]);
userModule.controller("LoginSignupCtrl",function($scope,$location,loginService){
  $scope.loginClick = function(user){
    console.log(user);

    loginService.login.post(
      {username: user.email, password: user.password},
      function(res){
        $location.url('/users/'+res.doc._id);
      },
      function(err){
        console.log(err);
      });
  };
});
userModule.controller("userDetailCtrl",function ($scope,usersService) {
});
