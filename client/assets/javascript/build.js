
  var selectedImg = "";
  var selectColor = "#ffffff";
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
  /* TODO: Add explanation and author to every function
     TODO: Fix drag & drop bugs (leftMenu popup, previousTile color, available space reset)
     TODO: Clean up code (remove console.logs and less global variables)
  */


  /*
   This function creates a skeleton with tiles
   @Author: Daye & Abdellatif
   */
  function createSkeleton(x, y) {

      var i;

      var skeleton = document.getElementById("back");
      skeleton.style.height = tileHeight * y;
      skeleton.style.width = tileWidth * x;
      skeletonSize = x * y;

      for (i = 0; i < skeletonSize; i++) {
          var tile = document.createElement("div");
          tile.id = "tile" + i;
          tile.className = 'containerTIle';
          tile.style.width = tileWidth;
          tile.style.height = tileHeight;
          tile.style.float = "left";
          tile.style.backgroundColor = 'red';
          tile.empty = true;
          //tile.addEventListener("click", selectTile, false);

          //var imageDiv = document.getElementById("drag1");
          //var imgResize = imageDiv.getElementsByTagName("img")[0];
          //imgResize.width = tileWidth;
          //imgResize.height = tileHeight;

          var clickContainer = document.getElementById("div1");
          clickContainer.style.width = tileWidth;
          clickContainer.style.height = tileHeight;
          //Had to clone it because I couldn't add ondrop and ondragover attributes to the tile

          var cln = clickContainer.cloneNode(true);
          cln.addEventListener("click", selectTile, false);
          cln.name = 'selectTile';
          cln.id = "div" + i;
          cln.style.zIndex = "2";
          cln.className = 'selectTile';
          tile.appendChild(cln);
          skeleton.appendChild(tile);
      }
  }
  function createFrontSkeleton(x, y) {

      var frontSkeleton = document.getElementById("front");
      frontSkeleton.style.height = tileHeight * y;
      frontSkeleton.style.width = tileWidth * x;
      skeletonSize = x * y;

      var tile = document.createElement("div");
      tile.id = "tile1";
      tile.className = 'containerTIle';
      tile.style.width = tileWidth;
      tile.style.height = tileHeight;
      tile.style.float = "left";
      tile.style.backgroundColor = 'yellow';
      tile.empty = true;

      var clickContainer = document.getElementById("div1");
      clickContainer.style.width = tileWidth;
      clickContainer.style.height = tileHeight;
      //Had to clone it because I couldn't add ondrop and ondragover attributes to the tile

      var cln = clickContainer.cloneNode(true);
      cln.addEventListener("click", selectTile, false);
      cln.name = 'selectTile';
      cln.id = "div" + i;
      cln.style.zIndex = "2";
      cln.className = 'selectTile';
      tile.appendChild(cln);
      frontSkeleton.appendChild(tile);

  }
  /*
   This function hanldes the selection of a tile
   @Author: Daye & Abdellatif
   */
  function selectTile(evt) {
      //console.log(evt.target.parentNode.empty);
      selectedTile = evt.target.parentNode.id;
      if(evt.target.parentNode.empty == false) {
          if (previousTile != null) {
              deselectTile();
          } else if (selectedTile != previousTile) {

              openLeftMenu();


              selectedObject = evt.target;
              console.log(evt.target.parentNode.empty);
              AddDeletePreview();

              originalColor = document.getElementById(selectedTile).style.backgroundColor;
              //document.getElementById(selectedTile).style.backgroundColor = "white";
              previousTile = selectedTile;
          }
      }
  }

  /*
   This function handles the deselection of a tile
   @Author: Daye & Abdellatif
   */
  function deselectTile() {

      var x = document.getElementById("tileColor");
      var res = x.options[x.selectedIndex].value;

      if (res != "color") {
          document.getElementById(previousTile).style.backgroundColor = res;
          document.getElementById("tileColor").value = "color";
      } else {
          document.getElementById(previousTile).style.backgroundColor = originalColor;
      }
      closeLeftMenu();
      previousTile = null;
  }


  /*
   This function opens the menu at the left
   @Author: Daye & Abdellatif
   */
  function openLeftMenu(){
      console.log("opening menu");
      var menu = document.getElementById("vWrapper");
      menu.style.visibility = "visible";
      console.log(menu);
  }

  /*
   This function closes the menu at the left
   @Author: Daye & Abdellatif
   */
  function closeLeftMenu(){
      var menu = document.getElementById("vWrapper");
      menu.style.visibility = "hidden";
  }


  /*
   This function changes the color of the tile
   @Author: Daye & Abdellatif
   */
  function changeTileColor() {

      var x = document.getElementById("tileColor");
      var res = x.options[x.selectedIndex].value;
      document.getElementById(selectedTile).style.backgroundColor = res;

  }

  /*
   This function adds text to a tile
   @Author: Daye & Abdellatif
   */
  function addText() {

      document.getElementById(selectedTile).innerText = document.getElementById("addTxt").value;
      //document.getElementById(selectedTile).style.zIndex = "2";
      document.getElementById(selectedTile).style.textAlign = 'center';
      document.getElementById(selectedTile).style.lineHeight = document.getElementById(selectedTile).style.height;
      document.getElementById("addTxtForm").reset();

  }

  /*
   This function changes the color of the text
   @Author: Daye & Abdellatif
   */
  function changeFontColor() {

      var x = document.getElementById("fontColor");
      var res = x.options[x.selectedIndex].value;
      document.getElementById(selectedTile).style.color = res;

  }

  /*
   This function changes the size of the font
   @Author: Daye
   */
  function changeFontSize() {

      var x = document.getElementById("fontSize");
      document.getElementById(selectedTile).style.fontSize = x.options[x.selectedIndex].value;

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

      var file = document.querySelector('input[type=file]').files[0]; //sames as here
      var reader = new FileReader();

      reader.onloadend = function () {
          var img = document.createElement("img");
          img.src = reader.result;
          img.style.height = tileWidth;
          img.style.width = tileHeight;

          //preview
//            document.getElementById("previewDiv").appendChild(img);
//            console.log(img.src);
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

      var preview = document.getElementById("deletePreviewDiv");
      var previewClone = selectedObject.cloneNode(true);
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
  function deleteTile() {

      originalColor = "red";
      document.getElementById(selectedTile).style.background = null;
      document.getElementById(selectedTile).innerText = "";
      deselectTile();

  }

  /*
   This function handles the rotation of an image
   @Author: Daye
   */
  function rotateTile() {
      document.getElementById(selectedTile).style.webkitTransform += 'rotate(45deg)';
  }

  /*
   This function handles the dynamic resizing of a tile
   @Author: Daye
   */
  function resizeTile() {

      var x = 0, y = 0;
      var element = document.getElementById(selectedTile);

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
  }

  /*
   This function handles the swapping of two tiles
   @Author: Abdellatif
   */
  function swapTiles(ev){
      console.log("commence switching procedure");
      var dummmy =  ev.target.parentNode.innerHTML;
     ev.target.parentNode.innerHTML = currentDraggingTile.innerHTML;
      currentDraggingTile.innerHTML = dummmy;
  }

  /*
   This function checks if there is a tile at the location where you want to drop a tile
   @Author: Abdellatif
   */
  function hasTile(element) {
      if(element.target.parentNode.empty === true){
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
      closeLeftMenu();
      showAvalaibleTileSpace();
  }

  /*
   This function shows the user where a tile can be placed
   @Author: Abdellatif
   */
  function showAvalaibleTileSpace(){
      var i;
      var skeleton = document.getElementById("phone");
      tempCloneOfSkeleton = skeleton.cloneNode(true);
      for (i = 0; i < skeletonSize; i++) {
          var tile = document.getElementById("tile" + i);
          //tile.style.backgroundColor = "#0000FF";
          //if(tile.empty == true){
              tile.style.backgroundColor = "#0000FF";
          //}
      }
  }

  /*
   This function resets the color back to the original color
   @Author: Abdellatif
   */
  function resetColorOfAvailableTiles(){
      var i;
      for (i = 0; i < skeletonSize; i++) {
          var tile = document.getElementById("tile" + i);
          tile.style.backgroundColor = tempCloneOfSkeleton.children[i].style.backgroundColor;
      }
  }

  /*
   This function handles the dropping of a tile
   @Author: Abdellatif
   */
  function drop(ev) {
      //console.log(ev.target);
      resetColorOfAvailableTiles();
      ev.preventDefault();
     // console.log("dropping");
      //console.log(ev.toElement.id);

      if(canSwap == false) {
          targetedDiv = document.getElementById(ev.toElement.id);

          targetedDiv.innerHTML = targetedDiv.innerHTML + currentDraggingTile.innerHTML;
          targetedDiv.parentNode.empty = false;
          targetedDiv.empty = false;
          currentDraggingTile.innerHTML = "";
          selectTile(ev);
      }
      else{
          swapTiles(ev);
      }
  }

var btn = document.getElementById('flip_content');
var content = document.getElementById('f1_card');
var c = 0;
btn.onclick = function () {
    content.className = (c++ % 2 == 0) ? content.className + ' flip' : content.className.split(' ')[0];
};

window.addEventListener("load", createSkeleton(3, 5));
window.addEventListener("load", createFrontSkeleton(3, 5));
