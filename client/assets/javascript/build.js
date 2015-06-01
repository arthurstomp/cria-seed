
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

  /*
   this function create skeleton with tiles.
   */
  function createSkeleton(x, y) {

      var i;

      var skeleton = document.getElementById("phone");
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

  function selectTile(evt) {
      console.log(evt.target.parentNode.empty);
      selectedTile = evt.target.parentNode.id;
      if(previousTile != null){
          console.log("closing menu");
          deselectTile();
      }else if(selectedTile != previousTile){
          console.log("opening menu");

          var menu = document.getElementById("vWrapper");
          menu.style.visibility = "visible";
          console.log(menu);


          selectedObject = evt.target;
          console.log(evt.target.parentNode.empty);
          AddDeletePreview();

          originalColor = document.getElementById(selectedTile).style.backgroundColor;
          document.getElementById(selectedTile).style.backgroundColor = "white";
          previousTile = selectedTile;
      }
  }

  function deselectTile() {

      var x = document.getElementById("tileColor");
      var res = x.options[x.selectedIndex].value;

      if (res != "color") {
          document.getElementById(previousTile).style.backgroundColor = res;
          document.getElementById("tileColor").value = "color";
      } else {
          document.getElementById(previousTile).style.backgroundColor = originalColor;
      }

      var menu = document.getElementById("vWrapper");
      menu.style.visibility = "hidden";
      previousTile = null;
  }


  function changeTileColor() {

      var x = document.getElementById("tileColor");
      var res = x.options[x.selectedIndex].value;
      document.getElementById(selectedTile).style.backgroundColor = res;

  }

  function addText() {

      document.getElementById(selectedTile).innerText = document.getElementById("addTxt").value;
      //document.getElementById(selectedTile).style.zIndex = "2";
      document.getElementById(selectedTile).style.textAlign = 'center';
      document.getElementById(selectedTile).style.lineHeight = document.getElementById(selectedTile).style.height;
      document.getElementById("addTxtForm").reset();

  }

  function changeFontColor() {

      var x = document.getElementById("fontColor");
      var res = x.options[x.selectedIndex].value;
      document.getElementById(selectedTile).style.color = res;

  }

  function changeFontSize() {

      var x = document.getElementById("fontSize");
      document.getElementById(selectedTile).style.fontSize = x.options[x.selectedIndex].value;

  }

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

  function changeFontType() {
      var x = document.getElementById("fontType");
      document.getElementById(selectedTile).style.fontFamily = x.options[x.selectedIndex].value;
  }

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

  function AddDeletePreview() {

      var preview = document.getElementById("deletePreviewDiv");
      var previewClone = selectedObject.cloneNode(true);
      previewClone.style.margin = "0 auto";

      if (selectedTile !== null) {

          preview.innerHTML = "";
          preview.appendChild(previewClone);
      }

  }

  function deleteTile() {

      originalColor = "red";
      document.getElementById(selectedTile).style.background = null;
      document.getElementById(selectedTile).innerText = "";
      deselectTile();

  }

  function rotateTile() {
      document.getElementById(selectedTile).style.webkitTransform += 'rotate(45deg)';
  }

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


  function allowDrop(ev) {
     // console.log(ev.target.parentNode);
      //console.log(hasTile(ev));
      if(hasTile) {
          ev.preventDefault();
      }
  }

  //
  function hasTile(element) {
      if(element.empty === true){
          return false;
      }
      else{
          return true;
      }
  }

  function drag(ev) {
     // console.log("dragging");
     // console.log(ev.toElement.parentNode);
      currentDraggingTile = ev.toElement.parentNode;

      showAvalaibleTileSpace();
  }

  function showAvalaibleTileSpace(){
      var i;
      var skeleton = document.getElementById("phone");
      tempCloneOfSkeleton = skeleton.cloneNode(true);
      for (i = 0; i < skeletonSize; i++) {
          var tile = document.getElementById("tile" + i);
          //tile.style.backgroundColor = "#0000FF";
          tile.style.backgroundColor = "#0000FF";
      }
  }

  function resetColorOfAvailableTiles(){
      var i;
      for (i = 0; i < skeletonSize; i++) {
          var tile = document.getElementById("tile" + i);
          tile.style.backgroundColor = tempCloneOfSkeleton.children[i].style.backgroundColor;
      }
  }

  function drop(ev) {
      //console.log(ev.target);
      resetColorOfAvailableTiles();
      ev.preventDefault();
     // console.log("dropping");
      //console.log(ev.toElement.id);

      targetedDiv = document.getElementById(ev.toElement.id);
      //console.log(targetedDiv);


      targetedDiv.innerHTML = targetedDiv.innerHTML + currentDraggingTile.innerHTML;
      targetedDiv.empty = false;
      currentDraggingTile.innerHTML = "";

      selectTile(ev);

  }

window.addEventListener("load", createSkeleton(3, 5));