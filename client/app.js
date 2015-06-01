/*jslint white: true */
/*global angular, BookListCtrl, BookDetailCtrl, HomeCtrl */

(function() {
  'use strict';

  var versatileApp = angular.module("VersatileApp",['ui.router','ngResource','CommonModule','UserModule']);

  versatileApp.config(['$resourceProvider', function($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
  }]);

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
        },
        'sessionContainer':{
          controller: 'SessionCtrl'
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
          controller: 'LoginSignupCtrl',
        }
      }
    });

    $stateProvider.state('userDetail',{
      url:'/users/:id',
      views:{
        'navbar':{
          templateUrl: 'partials/navbar.html',
          controller: 'NavbarCtrl',
        },
        'commonContainer':{
          templateUrl: 'partials/user_detail.html',
        }
      }
    });
  }]);
}());
