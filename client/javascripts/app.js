/*jslint white: true */
/*global angular, BookListCtrl, BookDetailCtrl, HomeCtrl */

var versatileApp = angular.module("VersatileApp",['ui.router','CommonModule']);

versatileApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
      url:'/',
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    });

    $stateProvider.state('build',{
        url:'/build',
        views:{
          'navbar':{
            templateUrl: 'partials/navbar.html',
            controller: 'NavbarCtrl'
          },
          'commonContainer':{
            templateUrl: 'partials/build.html',
            controller: 'HomeCtrl',
          }
        }
    });

    $stateProvider.state('cart',{
        url:'/cart',
        views:{
          'navbar':{
            templateUrl: 'partials/navbar.html',
            controller: 'NavbarCtrl'
          },
          'commonContainer':{
            templateUrl: 'partials/cart.html',
            controller: 'HomeCtrl',
          }
        }
    });

    $stateProvider.state('loginSignup',{
        url:'/login-signup',
        views:{
          'navbar':{
            templateUrl: 'partials/navbar.html',
            controller: 'NavbarCtrl'
          },
          'commonContainer':{
            templateUrl: 'partials/login_signup.html',
            controller: 'HomeCtrl',
          }
        }
    });
}]);
