/*jslint white: true */
/*global angular*/

(function() {
  'use strict';

  var buildModule = angular.module('BuildModule',['ngResource','ui.router']);

  buildModule.controller('MainBuildCtrl',function($scope,$state){
    console.log('Main Build Controller');
  });

  buildModule.controller('LeftMenuBuildCtrl',function($scope,$state){
    console.log('Left Menu Build Controller');

  });

  buildModule.controller('RightMenuBuildCtrl',function($scope,$state){
    console.log('Right Menu Build Controller');

  });

  buildModule.controller('BottomMenuBuildCtrl',function($scope,$state){
    console.log('Bottom MenuBuild Controller');

  });
}());
