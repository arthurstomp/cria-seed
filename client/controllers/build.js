/*jslint white: true */
/*global angular*/

(function() {
  'use strict';

  var buildModule = angular.module('BuildModule',['ngResource','ui.router','ngCookies','ProductModule']);

  buildModule.controller('MainBuildCtrl',function($scope,$state){
    console.log('Main Build Controller');
  });

  buildModule.controller('LeftMenuBuildCtrl',function($scope,$state){
    console.log('Left Menu Build Controller');

  });

  buildModule.controller('RightMenuBuildCtrl',function($scope,$state){
    console.log('Right Menu Build Controller');

  });

  buildModule.controller('BottomMenuBuildCtrl',function($scope,$state,productService){
    console.log('Bottom MenuBuild Controller');



    $scope.productsFromCurrentCategory = [];

    $scope.loadCategory = function(category){
      productService.productsByCategory.get({category:category},function(resObj){
        $scope.productsFromCurrentCategory = resObj.products;
      });
    };

    $scope.$on('$viewContentLoaded',function(){
      console.log('Bottom menu view loaded');
      productService.productsByCategory.get({category:'Battery'},function(resObj){
        console.log(resObj.products);
        $scope.productsFromCurrentCategory = resObj.products;
      });
    });

  });
}());
