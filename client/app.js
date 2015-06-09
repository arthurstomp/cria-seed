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
                                                    'ProductModule',
                                                    'BuildModule']),
      buildModule = angular.module('BuildModule',['ngResource',
                                                  'ui.router',
                                                  'ngCookies',
                                                  'ProductModule',
                                                  'CommonModule']),
      commonModule = angular.module("CommonModule",['ngResource',
                                                    'ui.router',
                                                    'ngCookies']),
      productModule = angular.module("ProductModule",['ngResource',
                                                      'ui.router']),
      userModule = angular.module("UserModule",['ngResource',
                                                'ui.router']);                


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
        // 'leftMenu' : {
        //   templateUrl : '/partials/leftMenu.html',
        //   controller : 'LeftMenuBuildCtrl',
        // },
        'rightMenu' : {
          templateUrl : '/partials/rightMenu.html',
          controller : 'RightMenuBuildCtrl',
        },
        // 'main':{
        //   templateUrl : '',
        //   controller : 'MainBuildCtrl',
        // },
        'bottomMenu' : {
          templateUrl : '/partials/bottomMenu.html',
          controller : 'BottomMenuBuildCtrl',
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
        '':{
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
        '':{
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
        '':{
          templateUrl: 'partials/user_detail.html',
        }
      }
    });
  }]);
}());
