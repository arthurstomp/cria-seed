/*jslint white: true */

(function() {
  'use strict';
  var selectedImg = "";
  var selectColor = "#ffffff";
  var freeSpotColor = "blue";
  var tileWidth = 150;
  var tileHeight = 150;
  var selectedTile;
  var originalColor = "red";
  var textColor;
  var selectedObject;
  var tempCloneOfSkeleton;
  var draggingTilePosition;
  var currentDraggingTile;
  var targetedDiv;
  var resetTile;
  var skeletonSize;
  var previousTile;
  var canSwap;
  /* TODO: Add API documentation
     TODO: Fix drag & drop bugs (leftMenu popup, previousTile color, available space reset)
     TODO: Clean up code (remove console.logs and less global variables)
     TODO: Make it Angular
  */


  /*
   This function creates a skeleton with tiles
   @Author: Daye & Abdellatif
   */
  function createBackSkeleton(x, y) {

      var i;
      var skeleton;
      skeleton = document.getElementById("back");
      if(skeleton == null){
        skeleton = document.createElement("div");
          skeleton.id = "back";
      }
      skeleton.style.height = tileHeight * y;
      skeleton.style.width = tileWidth * x;
      skeletonSize = x * y;
      skeleton.skeletonSize = skeletonSize;

      for (i = 0; i < skeletonSize; i++) {
          var tile, clickContainer, cln;
          tile = document.createElement("div");
          tile.id = "tile" + i;
          tile.className = 'containerTIle';
          tile.style.width = tileWidth;
          tile.style.height = tileHeight;
          tile.style.float = "left";
          tile.style.backgroundColor = 'red';
          tile.empty = true;

          tile.ondrop=function(){drop(event);};
          tile.ondragover=function(){allowDrop(event);};
          tile.draggable = true;
          tile.ondragstart=function(){drag(event);};
          tile.click=function(){selectTile;};

          skeleton.appendChild(tile);
      }
      return skeleton;
  }

  function createFrontSkeleton(x, y) {

      var frontSkeleton = document.getElementById("front");
      if(frontSkeleton == null){
          frontSkeleton = document.createElement("div");
          frontSkeleton.id = "front";
      }
      frontSkeleton.style.height = tileHeight * y;
      frontSkeleton.style.width = tileWidth * x;
      skeletonSize = x * y;
      frontSkeleton.skeletonSize = skeletonSize;

      var tile = document.createElement("div");
      tile.id = "tile1";
      tile.className = 'containerTIle';
      tile.style.width = tileWidth*x;
      tile.style.height = tileHeight*y;
      tile.style.float = "left";
      tile.style.backgroundColor = 'hotpink';
      tile.empty = true;

      tile.ondrop=function(){drop(event)};
      tile.ondragover=function(){allowDrop(event)};
      tile.draggable = true;
      tile.ondragstart=function(){drag(event)};
      tile.click=function(){selectTile};

      frontSkeleton.appendChild(tile);

      return frontSkeleton;
  }
  /*
   This function hanldes the selection of a tile
   @Author: Daye & Abdellatif
   */
  function selectTile(evt) {
      //console.log(evt.target.parentNode.empty);

      console.log(selectedTile);
      if(evt.target.parentNode.parentElement.id == "front") {
          console.log("dont open");
      }
      else{
          selectedTile = evt.target.id;
          if (evt.target.parentNode.empty == false) {
              if (previousTile != null) {
                  deselectTile();
                  console.log("hey ur deselecting man");
              } else if (selectedTile != previousTile) {


                  selectedObject = evt.target;
                  console.log(evt.target.parentNode.empty);
                  AddDeletePreview();

                  originalColor = document.getElementById(selectedTile).style.backgroundColor;
                  //document.getElementById(selectedTile).style.backgroundColor = "white";
                  previousTile = selectedTile;
              }
          }
          openMenu(document.getElementById("vWrapper"));
      }
      return selectedTile;
  }

  /*
   This function handles the deselection of a tile
   @Author: Daye & Abdellatif
   */
  function deselectTile() {

      var x, res, menu;
      x = document.getElementById("tileColor");
      res = x.options[x.selectedIndex].value;

      if (res != "color") {
          document.getElementById(previousTile).style.backgroundColor = res;
          document.getElementById("tileColor").value = "color";
      } else {
          document.getElementById(previousTile).style.backgroundColor = originalColor;
      }
      closeMenu(document.getElementById("vWrapper"));
      previousTile = null;
  }

  /*
   This function opens the menu at the left
   @Author: Daye & Abdellatif
   */
  function openMenu(target){
      //console.log("opening menu");
      //var menu = document.getElementById("vWrapper");
      //if(menu == null){
      //    menu = document.createElement("div");
      //    menu.id = "vWrapper";
      //}
      target.style.visibility = "visible";
      return target;
  }

  /*
   This function closes the menu at the left
   @Author: Daye & Abdellatif
   */
  function closeMenu(target){
      //var menu = document.getElementById("vWrapper");
      target.style.visibility = "hidden";
      return target;
  }


  /*
   This function changes the color of the tile
   @Author: Daye & Abdellatif
   */
  function changeTileColor(color) {
      var res;
      if(color == null){
           var x = document.getElementById("tileColor");
           res = x.options[x.selectedIndex].value;
      }
      else{
          res = color;
      }
      document.getElementById(selectedTile).style.backgroundColor = res;
      return selectedTile;
  }

  /*
   This function adds text to a tile
   @Author: Daye & Abdellatif
   */
  function addText(text) {
      console.log(selectedTile);
      var tile = document.getElementById(selectedTile);
      if(text == null){
          tile.innerText = document.getElementById("addTxt").value;
          document.getElementById("addTxtForm").reset();
      }
      else{
          tile.innerText = text;
      }
      tile.style.textAlign = 'center';
      tile.style.lineHeight = tile.style.height;
      return tile;
  }

  /*
   This function changes the color of the text
   @Author: Daye & Abdellatif
   */
  function changeFontColor(color) {
      if(color == null){
          var x = document.getElementById("fontColor");
          var res = x.options[x.selectedIndex].value;
          document.getElementById(selectedTile).style.color = res;
      }
      else{
          document.getElementById(selectedTile).style.color = color;
      }
      return document.getElementById(selectedTile);
  }

  /*
   This function changes the size of the font
   @Author: Daye
   */
  function changeFontSize(fontSize) {
      if(fontSize == null){
          var x = document.getElementById("fontSize");
          document.getElementById(selectedTile).style.fontSize = x.options[x.selectedIndex].value
      }
      else{
          document.getElementById(selectedTile).style.fontSize = "13";
      }
      return document.getElementById(selectedTile);
  }

  /*
   This function changes the style of the font
   @Author: Daye
   */
  function changeFontStyle() {

      var x = document.getElementById("fontStyle");
      if (x.options[x.selectedIndex].value == "italic") {
          document.getElementById(selectedTile).style.fontStyle = x.options[x.selectedIndex].value;
      } else if (x.options[x.selectedIndex].value == "underline") {
          document.getElementById(selectedTile).style.textDecoration = x.options[x.selectedIndex].value;
      } else {
          document.getElementById(selectedTile).style.fontWeight = x.options[x.selectedIndex].value;
      }
  }

  /*
   This function changes the type of the font
   @Author: Daye
   */
  function changeFontType() {
      var x = document.getElementById("fontType");
      document.getElementById(selectedTile).style.fontFamily = x.options[x.selectedIndex].value;
  }

  /*
   This function handles the uploading of ta picture
   @Author: Daye & Abdellatif
   */
  function previewFile() {
      var file,reader;

      file = document.querySelector('input[type=file]').files[0]; //sames as here
      reader = new FileReader();

      reader.onloadend = function () {
          var img = document.createElement("img");
          img.src = reader.result;
          img.style.height = tileWidth;
          img.style.width = tileHeight;

          //preview
//            document.getElementById("previewDiv").appendChild(img);
//            console.log(img.src);
          document.getElementById(selectedTile).innerHTML = "";
          document.getElementById(selectedTile).style.backgroundImage = "url(" + img.src + ")";
          document.getElementById(selectedTile).style.backgroundSize = 'cover';

      };

      if (file) {
          reader.readAsDataURL(file); //reads the data as a URL
      }
  }

  /*
   This function adds a preview of the selected tile when you are on the delete page
   @Author: Daye
   */
  function AddDeletePreview() {
      var preview, previewClone;

      preview = document.getElementById("deletePreviewDiv");
      previewClone = selectedObject.cloneNode(true);
      previewClone.style.margin = "0 auto";

      if (selectedTile !== null) {

          preview.innerHTML = "";
          preview.appendChild(previewClone);
      }

  }

  /*
   This function handles the deletion of a tile
   @Author: Daye
   */
  function deleteTile(selectedTileObject) {
      originalColor = "red";
      selectedTileObject.style.backgroundColor = null;
      selectedTileObject.innerText = "";
      //deselectTile();
      return selectedTileObject;
  }

  /*
   This function handles the rotation of an image
   @Author: Daye
   */
  function rotateTile(selectedTileObject) {
      if(selectedTileObject != null) {
          selectedTileObject.style.webkitTransform += 'rotate(45deg)';
      }
      else{
          //document.getElementById(selectedTile).style.webkitTransform += 'rotate(45deg)';
          document.getElementById(selectedTile).getElementsByTagName("img")[0].style.webkitTransform += 'rotate(45deg)';
          document.getElementById(selectedTile).style.overflow="hidden";
      }
  }

  /*
   This function handles the dynamic resizing of a tile
   @Author: Daye
   */
  function resizeTile() {

      var x = 0, y = 0, element;
      element = document.getElementById(selectedTile);

      interact(element)

          .draggable({
              snap: {
                  targets: [
                      interact.createSnapGrid({x: 20, y: 20})
                  ],
                  range: Infinity,
                  relativePoints: [{x: 0, y: 0}]
              },

              inertia: true,

              restrict: {
                  restriction: element.parentNode,
                  elementRect: {top: 0, left: 0, bottom: 1, right: 1},
                  endOnly: true
              }

          })

          .on('dragmove', function (event) {
              x += event.dx;
              y += event.dy;

              event.target.style.webkitTransform =
                  event.target.style.transform =
                      'translate(' + x + 'px, ' + y + 'px)';
          })

          .resizable({
              edges: {left: true, right: true, bottom: true, top: true}
          })

          .on('resizemove', function (event) {

              var target = event.target,
                  x = (parseFloat(target.getAttribute('data-x')) || 0),
                  y = (parseFloat(target.getAttribute('data-y')) || 0);

              if (target.style.width <= '150px' && target.style.height <= '150px') {

                  // update the element's style

                  target.style.width = event.rect.width + 'px';
                  target.style.height = event.rect.height + 'px';

                  // translate when resizing from top or left edges
                  x += event.deltaRect.left;
                  y += event.deltaRect.top;

                  target.style.webkitTransform = target.style.transform =
                      'translate(' + x + 'px,' + y + 'px)';

                  target.setAttribute('data-x', x);
                  target.setAttribute('data-y', y);

                  //target.textContent = event.rect.width + 'x' + event.rect.height;

              }

          });
  }

  /*
   This function checks if a tile can be dropped in a spot
   @Author: Abdellatif
   */
  function allowDrop(ev) {
      // console.log(ev.target.parentNode);
      //console.log(hasTile(ev));
      ev.preventDefault();
      if(hasTile(ev)) {
          console.log("thou may pass");
          canSwap = false;
      }
      else{
          console.log("thou shall not pass!");
          canSwap = true;
      }
      return ev;
  }

  /*
   This function handles the swapping of two tiles
   @Author: Abdellatif
   */
  function swapTiles(ev){
      console.log("commence switching procedure");
      //console.log(ev.target.parentNode.id);
      var dummmy =  ev.target.parentNode.innerHTML;
      ev.target.parentNode.innerHTML = currentDraggingTile.innerHTML;
      console.log(currentDraggingTile.id);
      currentDraggingTile.innerHTML = dummmy;
  }

  /*
   This function checks if there is a tile at the location where you want to drop a tile
   @Author: Abdellatif
   */
  function hasTile(event) {
      if(event.target.empty === true) {
          return true;
      }
      else{
          return false;
      }
  }

  /*
   This function handles the dragging of a tile
   @Author: Abdellatif
   */
  function drag(ev) {
     // console.log("dragging");
     // console.log(ev.toElement.parentNode);
      currentDraggingTile = ev.toElement.parentNode;
      closeMenu(document.getElementById("vWrapper"));
      //showAvalaibleTileSpace(document.getElementById("back"));
      //showAvalaibleTileSpace(document.getElementById("front"));
      return ev.target;
  }

  /*
   This function shows the user where a tile can be placed
   @Author: Abdellatif
   */
  function showAvalaibleTileSpace(skeleton){
      var i;
      tempCloneOfSkeleton = skeleton.cloneNode(true);
      for (i = 0; i < skeletonSize; i++) {
          //var tile = document.getElementById("tile" + i);
          //tile.style.backgroundColor = "#0000FF";
          //if(tile.empty == true){
          skeleton.children[i].style.backgroundColor = freeSpotColor;
          //}
      }
  }

  /*
   This function resets the color back to the original color
   @Author: Abdellatif
   */
  function resetColorOfAvailableTiles(skeleton){
      var i;
      for (i = 0; i < skeleton.skeletonSize; i++) {
          //var tile = document.getElementById("tile" + i);

          skeleton.children[i].style.backgroundColor = tempCloneOfSkeleton.children[i].style.backgroundColor;
      }
  }

  /*
   This function handles the dropping of a tile
   @Author: Abdellatif
   */
  function drop(ev) {
      //console.log(ev.target);
      //resetColorOfAvailableTiles(document.getElementById("back"));
      //resetColorOfAvailableTiles(document.getElementById("front"));
      ev.preventDefault();
     // console.log("dropping");
      //console.log(ev.toElement.id);

      if(canSwap == false) {
          targetedDiv = document.getElementById(ev.toElement.id);

          targetedDiv.innerHTML = targetedDiv.innerHTML + currentDraggingTile.innerHTML;
          //console.log(targetedDiv.style.width);
          //targetedDiv.getElementsByTagName("img")[0].style.width = targetedDiv.getElementsByTagName("img")[0].width;
          //console.log(targetedDiv.getElementsByTagName("img")[0].style.width);

          targetedDiv.getElementsByTagName("img")[0].style.width = targetedDiv.style.width;
          targetedDiv.getElementsByTagName("img")[0].style.height = targetedDiv.style.height;
          targetedDiv.parentNode.empty = false;
          targetedDiv.empty = false;
          currentDraggingTile.innerHTML = "";
          selectTile(ev);
      }
      else if(canSwap == true){
          swapTiles(ev);
      }
  }

  function confirmDelete () {

      if (confirm("Are you sure deleting a tile?")===true) {
          deleteTile(selectedObject);
      }

  }

  function changePattern () {


  }

  //TODO: CLean up this button code put it a function
var btn = document.getElementById('flip_content');
var content = document.getElementById('f1_card');
var c = 0;
  if(btn != null){
      btn.onclick = function () {
          closeMenu(document.getElementById("vWrapper"));
          content.className = (c++ % 2 == 0) ? content.className + ' flip' : content.className.split(' ')[0];
      };
  }


})();
