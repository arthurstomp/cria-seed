/*jslint white: true */
/*global angular*/

(function() {
  'use strict';

  var buildModule = angular.module('BuildModule',['ngResource','ui.router','ngCookies','ProductModule']);

  buildModule.controller('MainBuildCtrl',function($scope,$state,$rootScope){
    $rootScope.phone = {
      skeleton : {},
      front : [],
      back : [],
    };

    $rootScope.refresh = function(){
      $rootScope.productOnFocus = null;
    };

    $rootScope.historic = [$rootScope.phone];
    $rootScope.hitoricPointer = 0;
  });

  buildModule.controller('LeftMenuBuildCtrl',function($scope,$state){
    console.log('Left Menu Build Controller');

  });

  buildModule.controller('RightMenuBuildCtrl',function($scope,$state,$rootScope){
    console.log('Right Menu Build Controller');

  });

  buildModule.controller('BottomMenuBuildCtrl',function($scope,$state,$rootScope,productService){
    console.log('Bottom MenuBuild Controller');

    /**
    *
    * This part is a copy of the beggining of MainBuildCtrl.
    * i'm using here because i have to wait for Abdels part.
    * EREASE IT
    */
    $rootScope.phone = {
      skeleton : {},
      front : [],
      back : [],
    };

    $rootScope.refresh = function(){
      $rootScope.productOnFocus = null;
    };

    $rootScope.historic = [$rootScope.phone];
    $rootScope.hitoricPointer = 0;
    /**
    * STOP EREASING.
    */

    $scope.CATEGORIES = {
      SKELETON : 'skeleton',
      SCREEN : 'screen',
      PROCESSOR : 'processor',
      BATTERY : 'battery',
      STORAGE : 'storage',
      CONNECTION : 'connection',
      CAMERA : 'camera',
      SPEAKER : 'speaker'
    };

    $scope.currentCategory = $scope.CATEGORIES.SKELETON;
    $scope.productsFromCurrentCategory = [];
    $scope.categories = [{name : $scope.CATEGORIES.SKELETON, iconImgPath : '../assets/images/icons/SkeletonColor.png'},
                         {name : $scope.CATEGORIES.SCREEN, iconImgPath : '../assets/images/icons/ScreenColor.png'},
                         {name : $scope.CATEGORIES.PROCESSOR, iconImgPath : '../assets/images/icons/ProcessorColor.png'},
                         {name : $scope.CATEGORIES.BATTERY, iconImgPath : '../assets/images/icons/BatteryColor.png'},
                         {name : $scope.CATEGORIES.STORAGE, iconImgPath : '../assets/images/icons/StorageColor.png'},
                         {name : $scope.CATEGORIES.CONNECTION, iconImgPath : '../assets/images/icons/ConnectionColor.png'},
                         {name : $scope.CATEGORIES.CAMERA, iconImgPath : '../assets/images/icons/CameraColor.png'},
                         {name : $scope.CATEGORIES.SPEAKER, iconImgPath : '../assets/images/icons/SpeakerColor.png'},
                         ];

    $scope.loadCategory = function(category){
      productService.productsByCategory.get({category:category},function(resObj){
        $scope.productsFromCurrentCategory = resObj.products;
        $rootScope.refresh();
      });
    };

    $scope.focusProduct = function(product){
      $rootScope.productOnFocus = product;
    };

    $scope.$on('$viewContentLoaded',function(){
      productService.productsByCategory.get({category:'camera'},function(resObj){
        if (resObj.err) {
          $scope.productsFromCurrentCategoryError = resObj.err;
        }else{
          $scope.productsFromCurrentCategory = resObj.products;
        }
      });
    });

  });
}());
