/*jslint node: true */
/*globals myApp */

function HomeCtrl($scope){
  "use strict";
  $scope.header = "Hell Yeah";
  $scope.introTxt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum tempus eros, at cursus magna gravida vel. Aenean eu arcu nulla. Vivamus eleifend risus id venenatis malesuada. Ut facilisis auctor leo. Cras sem magna, suscipit vitae metus quis, egestas congue mi. In convallis tellus ut massa aliquet dignissim. Vestibulum eros arcu, volutpat id malesuada at, venenatis volutpat purus. Maecenas lobortis, nibh eget accumsan tempus, neque magna suscipit eros, eget commodo risus tellus vitae diam. Nullam faucibus ligula ut dolor maximus malesuada. Integer et scelerisque purus, eu posuere ligula. In porttitor nec lectus non viverra. Sed quam felis, elementum gravida dolor luctus, luctus malesuada massa. Nullam aliquet urna id magna sodales laoreet.";
  $scope.startClick = function(){
    console.log("start was clicked");
  };
}

myApp.controller('HomeCtrl', HomeCtrl);
