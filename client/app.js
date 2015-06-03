/*jslint white: true */
/*global angular */

(function() {
  'use strict';

  /**
  * versatileApp - Main app module
  * @constructor
  *
  * @param {module} ui.router -
  * @param {module} ngResource -
  */
  var versatileApp = angular.module("VersatileApp",['ui.router',
                                                    'ngResource',
                                                    'CommonModule',
                                                    'UserModule',
                                                    'ProductModule']);

  /**
  * Configuration blocks - get executed during the provider registrations and
  *configuration phase. Only providers and constants can be injected into
  *configuration blocks. This is to prevent accidental instantiation of services
  *before they have been fully configured.
  *
  * @param {object} $stateProvider -
  * @param {object} $urlRouterProvider -
  */
  versatileApp.config(['$stateProvider',
                       '$urlRouterProvider',
                       '$resourceProvider',
                       function($stateProvider, $urlRouterProvider, $resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
      url:'/',
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    });

    $stateProvider.state('build',{
      abstract : true,
      views : {
        '' : {
          templateUrl : 'partials/build.html',
        },
        'navbar' : {
           templateUrl : 'partials/navbar.html',
           controller : 'NavbarCtrl'
        },
      }
    }).state('build.root',{
      url: '/build',
      views: {
        'leftMenu' : {
          templateUrl : '/partials/leftMenu.html',
        },
        // 'rightMenu' : {
        //   templateUrl : ''
        // },
        // 'bottomMenu' : {
        //   templateUrl : ''
        // }
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
