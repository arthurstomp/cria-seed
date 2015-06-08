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
