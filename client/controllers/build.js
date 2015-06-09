/*jslint white: true */
/*global angular*/

(function() {
  'use strict';

  var buildModule = angular.module('BuildModule');

  buildModule.controller('MainBuildCtrl',function($scope,$state,$rootScope,$cookies,$interval,sessionService){
    $rootScope.phone = {
      skeleton : {},
      front : [],
      back : [],
    };

    $rootScope.refresh = function(){
      $rootScope.productOnFocus = null;
    };

    $rootScope.history = [$rootScope.phone];
    $rootScope.historyPointer = 0;

    $rootScope.CATEGORIES = {
      SKELETON : 'skeleton',
      SCREEN : 'screen',
      PROCESSOR : 'processor',
      BATTERY : 'battery',
      STORAGE : 'storage',
      CONNECTION : 'connection',
      CAMERA : 'camera',
      SPEAKER : 'speaker'
    };

    $rootScope.FRONT_OR_BACK = {
      FRONT : 'front',
      BACK : 'back',
    };

    $scope.removeOutdatedHistory = function(){
      for (var i = $rootScope.history.lenght - 1 - $rootScope.historyPointer ; i > array.length; i--) {
        $rootScope.history.pop();
      }
    };

    $rootScope.saveState = function(){
      $rootScope.history[$rootScope.historyPointer] = $rootScope.phone;
      $rootScope.historyPointer += 1;
    };

    $rootScope.addProductToCart = function(product,customization,position){
      var isSkeleton = false,
          item = {};
      product.categories.forEach(function(category){
        isSkeleton = category === $rootScope.CATEGORIES.SKELETON ? true : false;
      });

      item.product = product;
      item.customization = customization;

      if (!isSkeleton) {
        item.position.frontOrBack = position.frontOrBack;
        item.position.tilePosition = position.tilePosition;

        if (position.frontOrBack === $rootScope.FRONT_OR_BACK.FRONT) {
          $rootScope.phone.front.push(item);
        }

        if (position.frontOrBack === $rootScope.FRONT_OR_BACK.BACK) {
          $rootScope.phone.back.push(item);
        }
      }else{
        $rootScope.phone.skeleton = item;
      }

      $scope.removeOutdatedHistory();
      $rootScope.saveState();
    };

    $scope.saveCart = function(){

    };

    $scope.$on('$viewContentLoaded',function(){

    });
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

    $rootScope.CATEGORIES = {
      SKELETON : 'skeleton',
      SCREEN : 'screen',
      PROCESSOR : 'processor',
      BATTERY : 'battery',
      STORAGE : 'storage',
      CONNECTION : 'connection',
      CAMERA : 'camera',
      SPEAKER : 'speaker'
    };

    $rootScope.FRONT_OR_BACK = {
      FRONT : 'front',
      BACK : 'back',
    };

    $scope.removeOutdatedHistory = function(){
      for (var i = $rootScope.history.lenght - 1 - $rootScope.historyPointer ; i > array.length; i--) {
        $rootScope.history.pop();
      }
    };

    $rootScope.saveState = function(){
      $rootScope.history[$rootScope.historyPointer] = $rootScope.phone;
      $rootScope.historyPointer += 1;
    };

    $rootScope.addProductToCart = function(product,customization,position){
      var isSkeleton = false,
          item = {};
      product.categories.forEach(function(category){
        isSkeleton = category === $rootScope.CATEGORIES.SKELETON ? true : false;
      });

      item.product = product;
      item.customization = customization;

      if (!isSkeleton) {
        item.position.frontOrBack = position.frontOrBack;
        item.position.tilePosition = position.tilePosition;

        if (position.frontOrBack === $rootScope.FRONT_OR_BACK.FRONT) {
          $rootScope.phone.front.push(item);
        }

        if (position.frontOrBack === $rootScope.FRONT_OR_BACK.BACK) {
          $rootScope.phone.back.push(item);
        }
      }else{
        $rootScope.phone.skeleton = item;
      }

      $scope.removeOutdatedHistory();
      $rootScope.saveState();
    };
    /**
    * STOP EREASING.
    */

    $scope.currentCategory = $rootScope.CATEGORIES.SKELETON;
    $scope.productsFromCurrentCategory = [];
    $scope.categories = [{name : $rootScope.CATEGORIES.SKELETON,
                          iconImgPath : '../assets/images/icons/SkeletonColor.png'},
                         {name : $rootScope.CATEGORIES.SCREEN,
                          iconImgPath : '../assets/images/icons/ScreenColor.png'},
                         {name : $rootScope.CATEGORIES.PROCESSOR,
                          iconImgPath : '../assets/images/icons/ProcessorColor.png'},
                         {name : $rootScope.CATEGORIES.BATTERY,
                          iconImgPath : '../assets/images/icons/BatteryColor.png'},
                         {name : $rootScope.CATEGORIES.STORAGE,
                          iconImgPath : '../assets/images/icons/StorageColor.png'},
                         {name : $rootScope.CATEGORIES.CONNECTION,
                          iconImgPath : '../assets/images/icons/ConnectionColor.png'},
                         {name : $rootScope.CATEGORIES.CAMERA,
                          iconImgPath : '../assets/images/icons/CameraColor.png'},
                         {name : $rootScope.CATEGORIES.SPEAKER,
                          iconImgPath : '../assets/images/icons/SpeakerColor.png'},
                         ];

    $scope.loadCategory = function(category){
      productService.productsByCategory.get({category:category},function(resObj){
        if (resObj.err) {
          console.log("load category has an error");
          console.log(resObj.err);
          $scope.productsFromCurrentCategoryError = resObj.err;
        }else{
          $scope.productsFromCurrentCategory = resObj.products;
        }
      });
    };

    $scope.focusProduct = function(product){
      $rootScope.productOnFocus = product;
    };

  });
}());
