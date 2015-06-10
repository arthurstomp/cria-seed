var selectedImg = "";
var selectColor = "#ffffff";
var freeSpotColor = "blue";
var tileWidth = 130;
var tileHeight = 130;
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
var ddmenuitem;
var closetimer;
var timeout = 500;

/* TODO: Add API documentation
 TODO: Fix drag & drop bugs (leftMenu popup, previousTile color, available space reset)
 TODO: Clean up code (remove console.logs and less global variables)
 TODO: Make it Angular
 */

/**
 * @module buildJS
 */

/**
 * this function create backside of skeleton.
 * @function
 * @author Daye & Abdellatif
 * @param {number} x numbers of rows
 * @param {number} y numbers of columns
 * @return {object} skeleton completed skeleton
 */
function createBackSkeleton(x, y) {
    var i;
    var skeleton;
    skeleton = document.getElementById("back");
    if (skeleton == null) {
        skeleton = document.createElement("div");
        skeleton.id = "back";
    }
    skeleton.style.height = (tileHeight * y).toString() + "px";
    skeleton.style.width = (tileWidth * x).toString() + "px";
    skeletonSize = x * y;
    skeleton.skeletonSize = skeletonSize;

    for (i = 0; i < skeletonSize; i++) {
        var tile, clickContainer, cln;
        tile = document.createElement("div");
        tile.id = "tile" + i;
        tile.className = 'containerTile';
        tile.style.width = tileWidth.toString() + "px";
        tile.style.height = tileHeight.toString() + "px";
        tile.style.float = "left";
        tile.style.backgroundColor = "red";
        //tile.style.zIndex = "2";
        tile.empty = true;
        //console.log(tile.style);

        tile.ondrop = function () {
            drop(event);
        };
        tile.ondragover = function () {
            allowDrop(event);
        };
        tile.draggable = true;
        tile.ondragstart = function () {
            drag(event);
        };
        tile.click = function () {
            selectTile(event);
        };

        skeleton.appendChild(tile);
    }
    return skeleton;
}

/**
 * this function frontside of skeleton(for screen).
 * @function
 * @author Daye & Abdellatif
 * @param {number} x numbers of rows
 * @param {number} y numbers of columns
 * @variable frontSkeleton
 * @return {object} frontSkeleton completed frontside skeleton
 */

function createFrontSkeleton(x, y) {

    var frontSkeleton = document.getElementById("front");
    if (frontSkeleton == null) {
        frontSkeleton = document.createElement("div");
        frontSkeleton.id = "front";
    }
    frontSkeleton.style.height = (tileHeight * y).toString() + "px";
    frontSkeleton.style.width = (tileWidth * x).toString() + "px";
    skeletonSize = x * y;
    frontSkeleton.skeletonSize = skeletonSize;

    var tile = document.createElement("div");
    tile.id = "tile1";
    tile.className = 'containerTIle';
    tile.style.width = frontSkeleton.style.width;
    tile.style.height = frontSkeleton.style.height;
    tile.style.float = "left";
    tile.style.backgroundColor = 'hotpink';
    tile.empty = true;

    tile.ondrop = function () {
        drop(event)
    };
    tile.ondragover = function () {
        allowDrop(event)
    };
    tile.draggable = true;
    tile.ondragstart = function () {
        drag(event)
    };
    tile.click = function () {
        selectTile(event)
    };

    frontSkeleton.appendChild(tile);

    return frontSkeleton;
}

/**
 * this function handles the selection of a tile
 * @function selectTile
 * @author Daye & Abdellatif
 * @param {object} evt the object where the event occurs.
 * @return {object} selectedTile It will return selected Tile.
 */
function selectTile(evt) {
    console.log("pew pew");

    if (evt.target.parentNode.parentElement.id == "front") {
        console.log("dont open");
    }
    else {
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


/**
 *  This function handles the deselection of a tile
 * @function deselectTile()
 * @author Daye & Abdellatif
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

/**
 *  This function opens the menu popup if users click menu icon.
 * @function openMenu
 * @author Daye
 * @param target id which one occurs event
 */
function openMenu(target) {
    //console.log("opening menu");
    //var menu = document.getElementById("vWrapper");
    //if(menu == null){
    //    menu = document.createElement("div");
    //    menu.id = "vWrapper";
    //}
    target.style.visibility = "visible";
    return target;
}

/**
 *  This function closes the menu popup if users click menu icon.
 * @function closeMenu
 * @author Daye
 * @param target id which occurs event (menu icon)
 * @return {object} target which occurs event (menu icon)
 */
function closeMenu(target) {
    //var menu = document.getElementById("vWrapper");
    target.style.visibility = "hidden";
    return target;
}

/**
 *  This function changes color of tiles.
 * @function changeTileColor
 * @author Daye & Abdellatif
 * @param color color name which users choose.
 * @return {object} selectedTile a tile which one is changing color.
 */
function changeTileColor(color) {
    var res;
    if (color == null) {
        var x = document.getElementById("tileColor");
        res = x.options[x.selectedIndex].value;
    }
    else {
        res = color;
    }
    document.getElementById(selectedTile).style.backgroundColor = res;
    return selectedTile;
}

/**
 *  This function add text on the tile.
 * @function addText
 * @author Daye & Abdellatif
 * @param text text string which users want to add
 * @return {object} tile a tile that text is added.
 */
function addText(text) {
    var tile = document.getElementById(selectedTile);
    if (text == null) {
        tile.innerText = document.getElementById("addTxt").value;
        document.getElementById("addTxtForm").reset();
    }
    else {
        tile.innerText = text;
    }
    tile.style.textAlign = 'center';
    tile.style.lineHeight = tile.style.height;
    return tile;
}

/**
 *  This function change font color on the tile.
 * @function changeFontColor
 * @author Daye & Abdellatif
 * @param color color name string that user wants to change.
 * @return {object} tile that will be changed.
 */
function changeFontColor(color) {
    if (color == null) {
        var x = document.getElementById("fontColor");
        var res = x.options[x.selectedIndex].value;
        document.getElementById(selectedTile).style.color = res;
    }
    else {
        document.getElementById(selectedTile).style.color = color;
    }
    return document.getElementById(selectedTile);
}

/**
 *  This function change font size on the tile.
 * @function changeFontSize
 * @author Daye
 * @param fontsize size of font that user wants to change.
 * @return {object} tile that will be changed.
 */
function changeFontSize(fontSize) {
    if (fontSize == null) {
        var x = document.getElementById("fontSize");
        document.getElementById(selectedTile).style.fontSize = (x.options[x.selectedIndex].value).toString() + "px";
    }
    else {
        document.getElementById(selectedTile).style.fontSize = "13";
    }
    return document.getElementById(selectedTile);
}

/**
 *  This function change font style on the tile.
 * @function changeFontStyle
 * @author Daye
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

/**
 *  This function change font type on the tile.
 * @function changeFontType
 * @author Daye
 */
function changeFontType() {
    var x = document.getElementById("fontType");
    document.getElementById(selectedTile).style.fontFamily = x.options[x.selectedIndex].value;
}

/**
 *   This function handles the uploading of ta picture
 * @function previewFile
 * @author Daye & Abdellatif
 */
function previewFile() {
    var file, reader;

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
        //document.getElementById(selectedTile).innerHTML = "";
        document.getElementById(selectedTile).style.backgroundImage = "url(" + img.src + ")";
        document.getElementById(selectedTile).style.backgroundSize = 'cover';

    };

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    }
}

/**
 * This function adds a preview of the selected tile when you are on the delete page
 * @function AddDeletePreview
 * @author Daye
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

/**
 * This function handles the deletion of a tile
 * @function deleteTile
 * @author Daye
 * @param selectedTileObject tile that will be deleted.
 * @return {object}
 */
function deleteTile(selectedTileObject) {
    originalColor = "red";
    selectedTileObject.style.backgroundColor = null;
    selectedTileObject.innerText = "";
    //deselectTile();
    return selectedTileObject;
}

/**
 * This function handles the rotation of an image
 * @function rotateTile
 * @author Daye
 * @param selectedTileObject tile that will be rotated.
 */
function rotateTile(selectedTileObject) {
    if (selectedTileObject != null) {
        selectedTileObject.style.webkitTransform += 'rotate(45deg)';
    }
    else {
        //document.getElementById(selectedTile).style.webkitTransform += 'rotate(45deg)';
        document.getElementById(selectedTile).getElementsByTagName("img")[0].style.webkitTransform += 'rotate(45deg)';
        document.getElementById(selectedTile).style.overflow = "hidden";
    }
}

/**
 *  This function handles the dynamic resizing of a tile
 * @function resizeTile
 * @author Daye
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

/**
 *   This function checks if a tile can be dropped in a spot
 * @function allowDrop
 * @author abdellatif
 * @param ev the tile which is allowed to drop
 * @return {object} ev the tile which is allowed to drop
 */
function allowDrop(ev) {
    // console.log(ev.target.parentNode);
    //console.log(hasTile(ev));
    ev.preventDefault();
    if (hasTile(ev)) {
        console.log("thou may pass");
        canSwap = false;
    }
    else {
        console.log("thou shall not pass!");
        canSwap = true;
    }
    return ev;
}

/**
 *  This function handles the swapping of two tiles
 * @function swapTile
 * @author Abdellatif
 * @param ev the tile which will be swapped
 */
function swapTiles(ev) {
    console.log("commence switching procedure");
    //console.log(ev.target.parentNode.id);
    var dummmy = ev.target.parentNode.innerHTML;
    ev.target.parentNode.innerHTML = currentDraggingTile.innerHTML;
    console.log(currentDraggingTile.id);
    currentDraggingTile.innerHTML = dummmy;
}

/**
 * This function checks if there is a tile at the location where you want to drop a tile
 * @function hasTile
 * @author Abdellatif
 * @param event the container which is already having tile.
 */
function hasTile(event) {
    if (event.target.empty === true) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * This function handles the dragging of a tile
 * @function drag
 * @author Abdellatif
 * @param ev the tile which is dragged.
 * @return object ev.target which one is dragged
 */
function drag(ev) {
    //console.log("dragging");
    // console.log(ev.toElement.parentNode);
    currentDraggingTile = ev.toElement.parentNode;
    closeMenu(document.getElementById("vWrapper"));
    //showAvailableTileSpace(document.getElementById("back"));
    //showAvailableTileSpace(document.getElementById("front"));
    return ev.target;
}

/**
 *  This function shows the user where a tile can be placed
 * @function showAvailableTileSpace
 * @author Abdellatif
 * @param skeleton the skeleton
 */
function showAvailableTileSpace(skeleton) {
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

/**
 *  This function resets the color back to the original color
 * @function resetColorOfAvailableTiles
 * @author Abdellatif
 * @param skeleton the skeleton
 */
function resetColorOfAvailableTiles(skeleton) {
    var i;
    for (i = 0; i < skeleton.skeletonSize; i++) {
        //var tile = document.getElementById("tile" + i);

        skeleton.children[i].style.backgroundColor = tempCloneOfSkeleton.children[i].style.backgroundColor;
    }
}

/**
 *   This function handles the dropping of a tile
 * @function drop
 * @author Abdellatif
 * @param ev which tile will be dropped.
 */
function drop(ev) {
    //console.log(ev.target);
    //resetColorOfAvailableTiles(document.getElementById("back"));
    //resetColorOfAvailableTiles(document.getElementById("front"));
    ev.preventDefault();
    // console.log("dropping");
    //console.log(ev.toElement.id);

    if (canSwap == false) {
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
    else if (canSwap == true) {
        swapTiles(ev);
    }
}

/**
 *  This function makes pop-up about confrimation about deleting tiles.
 * @function confrimDelete
 * @author Daye
 */
function confirmDelete() {

    if (confirm("Are you sure deleting a tile?") === true) {
        deleteTile(selectedObject);
    }
}

/**
 *  This function changes patterns on the tile.
 * @function changePattern
 * @author Daye
 */

//TODO: CLean up this button code put it a function
var btn = document.getElementById('flip_content');
var content = document.getElementById('f1_card');
var c = 0;
if (btn != null) {
    btn.onclick = function () {
        closeMenu(document.getElementById("vWrapper"));
        content.className = (c++ % 2 == 0) ? content.className + ' flip' : content.className.split(' ')[0];
    };
}


function switchButton() {
    //TODO: CLean up this button code put it a function
    var btn = document.getElementById('flip_content');
    var content = document.getElementById('f1_card');
    var c = 0;
    if (btn != null) {
        btn.onclick = function () {
            closeMenu(document.getElementById("vWrapper"));
            console.log(content);
            content.className = (c++ % 2 == 0) ? content.className + ' flip' : content.className.split(' ')[0];
        };
    }
}
var iconSelect = new IconSelect("my-icon-select", {
    'selectedIconWidth': 60,
    'selectedIconHeight': 60,
    'selectedBoxPadding': 1,
    'iconsWidth': 70,
    'iconsHeight': 70,
    'boxIconSpace': 1,
    'vectoralIconNumber': 2,
    'horizontalIconNumber': 5
});

var icons = [];
icons.push({'iconFilePath': '../assets/images/p0.png', 'iconValue': '0'});
icons.push({'iconFilePath': '../assets/images/p1.png', 'iconValue': '1'});
icons.push({'iconFilePath': '../assets/images/p2.png', 'iconValue': '2'});
icons.push({'iconFilePath': '../assets/images/p3.png', 'iconValue': '3'});
icons.push({'iconFilePath': '../assets/images/p4.png', 'iconValue': '4'});
icons.push({'iconFilePath': '../assets/images/p5.png', 'iconValue': '5'});
icons.push({'iconFilePath': '../assets/images/p6.png', 'iconValue': '6'});
icons.push({'iconFilePath': '../assets/images/p7.png', 'iconValue': '7'});
icons.push({'iconFilePath': '../assets/images/p8.png', 'iconValue': '8'});
icons.push({'iconFilePath': '../assets/images/p9.png', 'iconValue': '9'});
iconSelect.refresh(icons);


changePattern.DEFAULT = {};
changePattern.DEFAULT.SELECTED_ICON_WIDTH = 48;
changePattern.DEFAULT.SELECTED_ICON_HEIGHT = 48;
changePattern.DEFAULT.SELECTED_BOX_PADDING = 1;
changePattern.DEFAULT.SELECTED_BOX_PADDING_RIGHT = 12;
changePattern.DEFAULT.ICONS_WIDTH = 32;
changePattern.DEFAULT.ICONS_HEIGHT = 32;
changePattern.DEFAULT.BOX_ICON_SPACE = 1;
changePattern.DEFAULT.HORIZONTAL_ICON_NUMBER = 3;
changePattern.DEFAULT.VECTORAL_ICON_NUMBER = 3;

changePattern.COMPONENT_ICON_FILE_PATH = "images/arrow.png";

/**
 * this function makes selection list for patterns and change pattern for tiles.
 * @function
 * @author Daye
 * @param {string} $$elementID
 * @param {string} $$parameters
 */
function changePattern($$elementID, $$parameters) {

    var _icons = [];
    var _selectedIndex = -1;
    var _boxScroll;

    var _default = changePattern.DEFAULT;

    IconSelect.DEFAULT = {};
    IconSelect.DEFAULT.SELECTED_ICON_WIDTH = 48;
    IconSelect.DEFAULT.SELECTED_ICON_HEIGHT = 48;
    IconSelect.DEFAULT.SELECTED_BOX_PADDING = 1;
    IconSelect.DEFAULT.SELECTED_BOX_PADDING_RIGHT = 12;
    IconSelect.DEFAULT.ICONS_WIDTH = 32;
    IconSelect.DEFAULT.ICONS_HEIGHT = 32;
    IconSelect.DEFAULT.BOX_ICON_SPACE = 1;
    IconSelect.DEFAULT.HORIZONTAL_ICON_NUMBER = 3;
    IconSelect.DEFAULT.VECTORAL_ICON_NUMBER = 3;
    IconSelect.COMPONENT_ICON_FILE_PATH = "images/arrow.png";

    function IconSelect($$elementID, $$parameters) {
        var _icons = [];
        var _selectedIndex = -1;
        var _boxScroll;
        var _default = IconSelect.DEFAULT;

        function _init() {
            console.log("kalimpo");
            if (!$$parameters) $$parameters = {};
            console.log("boemba");
            console.log($$elementID);
            console.log(document.getElementById($$elementID));
            console.log(_View.setIconSelectElement($$elementID));
            if (_View.setIconSelectElement($$elementID)) {
                console.log("rakon");
                $$parameters = _Model.checkParameters($$parameters);

                var ui = _View.createUI($$parameters, $$elementID);

                _View.iconSelectElement.onclick = function () {
                    _View.showBox();
                };
                _View.showBox(false);
                _View.iconSelectElement.addEventListener('click', function ($event) {
                    $event.stopPropagation();
                });
                window.addEventListener('click', function () {
                    _View.showBox(false);
                });
            }
        }

        this.refresh = function ($icons) {
            console.log("pew pew miauw");
            _icons = [];
            var setSelectedIndex = this.setSelectedIndex;
            for (var i = 0; i < $icons.length; i++) {
                $icons[i].element = _View.createIcon($icons[i].iconFilePath, $icons[i].iconValue, i, $$parameters);
                $icons[i].element.onclick = function () {
                    setSelectedIndex(this.childNodes[0].getAttribute('icon-index'));
                };
                _icons.push($icons[i]);
            }
        };
        this.getIcons = function () {
            return _icons;
        };
        this.setSelectedIndex = function ($index) {
            var icon;
            if (_icons.length > $index)
                icon = _icons[$index];
            if (icon) {
                if (_selectedIndex != -1) _icons[_selectedIndex].element.setAttribute('class', 'icon');
                _selectedIndex = $index;
                _View.selectedIconImgElement.setAttribute('src', icon.iconFilePath);
                if (_selectedIndex != -1) _icons[_selectedIndex].element.setAttribute('class', 'icon selected');
                document.getElementById(selectedTile).style.backgroundImage = "url(" + _icons[_selectedIndex].iconFilePath + ")";
                console.log(_icons[_selectedIndex].iconFilePath);
            }
        };
        function _View() {

        }

        _View.iconSelectElement;
        _View.boxElement;
        _View.boxScrollElement;
        _View.selectedIconImgElement;
        _View.selectedIconElement;
        _View.showBox = function ($isShown) {
            if ($isShown == null) {
                $isShown = (_View.boxElement.style.display == "none") ? true : false;
            }
            if ($isShown) {
                _View.boxElement.style.display = "block";
                _View.boxScrollElement.style.display = "block";
            } else {
                _View.boxElement.style.display = "none";
                _View.boxScrollElement.style.display = "none";
            }
            _View.boxElement.style.display = ($isShown) ? "block" : "none";
        };
        _View.setIconSelectElement = function ($elementID) {
            _View.iconSelectElement = document.getElementById($elementID);
            console.log(document.getElementById($elementID));
            return _View.iconSelectElement;
        };
        _View.clearUI = function () {
            _View.iconSelectElement.innerHTML = "";
        };
        _View.clearIcons = function () {
            _View.boxElement.innerHTML = "";
        };
        _View.createUI = function ($parameters) {
            _View.clearUI();
            _View.iconSelectElement.setAttribute('class', 'icon-select');
            var selectedBoxElement = document.createElement('div');
            selectedBoxElement.setAttribute('class', 'selected-box');
            var selectedIconElement = document.createElement('div');
            selectedIconElement.setAttribute('class', 'selected-icon');
            _View.selectedIconImgElement = document.createElement('img');
            _View.selectedIconImgElement.setAttribute('src', '');
            selectedIconElement.appendChild(_View.selectedIconImgElement);
            var componentIconElement = document.createElement('div');
            componentIconElement.setAttribute('class', 'component-icon');
            var componentIconImgElement = document.createElement('img');
            componentIconImgElement.setAttribute('src', changePattern.COMPONENT_ICON_FILE_PATH);
            componentIconElement.appendChild(componentIconImgElement);
            _View.boxScrollElement = document.createElement('div');
            _View.boxScrollElement.setAttribute('id', $$elementID + "-box-scroll");
            _View.boxScrollElement.setAttribute('class', 'box');
            _View.boxElement = document.createElement('div');
            console.log("pew pew blub");
            console.log(_View.boxElement);
            _View.boxScrollElement.appendChild(_View.boxElement);
            _View.selectedIconImgElement.setAttribute('width', $parameters.selectedIconWidth);
            _View.selectedIconImgElement.setAttribute('height', $parameters.selectedIconHeight);
            selectedIconElement.style.width = $parameters.selectedIconWidth;
            selectedIconElement.style.height = $parameters.selectedIconHeight;
            selectedBoxElement.style.width = $parameters.selectedIconWidth + $parameters.selectedBoxPadding + $parameters.selectedBoxPaddingRight;
            selectedBoxElement.style.height = $parameters.selectedIconHeight + ($parameters.selectedBoxPadding * 2);
            selectedIconElement.style.top = $parameters.selectedBoxPadding;
            selectedIconElement.style.left = $parameters.selectedBoxPadding;
            componentIconElement.style.bottom = 4 + $parameters.selectedBoxPadding;
            _View.boxScrollElement.style.left = parseInt(selectedBoxElement.style.width) + 1;
            _View.boxScrollElement.style.width = (($parameters.iconsWidth + 2) * $parameters.vectoralIconNumber) +
            (($parameters.vectoralIconNumber + 1) * $parameters.boxIconSpace);
            _View.boxScrollElement.style.height = (($parameters.iconsHeight + 2) * $parameters.horizontalIconNumber) +
            (($parameters.horizontalIconNumber + 1) * $parameters.boxIconSpace);
            _View.boxElement.style.left = _View.boxScrollElement.style.left;
            _View.boxElement.style.width = _View.boxScrollElement.style.width;
            _View.iconSelectElement.appendChild(selectedBoxElement);
            selectedBoxElement.appendChild(selectedIconElement);
            selectedBoxElement.appendChild(componentIconElement);
            selectedBoxElement.appendChild(_View.boxScrollElement);
            var results = {};
            results['iconSelectElement'] = _View.iconSelectElement;
            results['selectedBoxElement'] = selectedBoxElement;
            results['selectedIconElement'] = selectedIconElement;
            results['selectedIconImgElement'] = _View.selectedIconImgElement;
            results['componentIconElement'] = componentIconElement;
            results['componentIconImgElement'] = componentIconImgElement;
            return results;
        };
        _View.createIcon = function ($iconFilePath, $iconValue, $index, $parameters) {
            var iconElement = document.createElement('div');
            iconElement.setAttribute('class', 'icon');
            iconElement.style.width = $parameters.iconsWidth;
            iconElement.style.height = $parameters.iconsHeight;
            iconElement.style.marginLeft = $parameters.boxIconSpace;
            iconElement.style.marginTop = $parameters.boxIconSpace;
            var iconImgElement = document.createElement('img');
            iconImgElement.setAttribute('src', $iconFilePath);
            iconImgElement.setAttribute('icon-value', $iconValue);
            iconImgElement.setAttribute('icon-index', $index);
            iconImgElement.setAttribute('width', $parameters.iconsWidth);
            iconImgElement.setAttribute('height', $parameters.iconsHeight);
            iconElement.appendChild(iconImgElement);
            _View.boxElement.appendChild(iconElement);

            return iconElement;
        };
        function _Model() {
        }

        _Model.checkParameters = function ($parameters) {
            $parameters.selectedIconWidth = ($parameters.selectedIconWidth) ? $parameters.selectedIconWidth : _default.SELECTED_ICON_WIDTH;
            $parameters.selectedIconHeight = ($parameters.selectedIconHeight) ? $parameters.selectedIconHeight : _default.SELECTED_ICON_HEIGHT;
            $parameters.selectedBoxPadding = ($parameters.selectedBoxPadding) ? $parameters.selectedBoxPadding : _default.SELECTED_BOX_PADDING;
            $parameters.iconsWidth = ($parameters.iconsWidth) ? $parameters.iconsWidth : _default.ICONS_WIDTH;
            $parameters.iconsHeight = ($parameters.iconsHeight) ? $parameters.iconsHeight : _default.ICONS_HEIGHT;
            $parameters.boxIconSpace = ($parameters.boxIconSpace) ? $parameters.boxIconSpace : _default.BOX_ICON_SPACE;
            $parameters.vectoralIconNumber = ($parameters.vectoralIconNumber) ? $parameters.vectoralIconNumber : _default.VECTORAL_ICON_NUMBER;
            $parameters.horizontalIconNumber = ($parameters.horizontalIconNumber) ? $parameters.horizontalIconNumber : _default.HORIZONTAL_ICON_NUMBER;
            return $parameters;
        };
        _init();
    }
}

/**
 *  This function open the menu if user clicks the left or right menu items.
 * @function mopen
 * @author Daye
 * @param id id of menu items which one is clicked.
 */
function mopen(id) {
    mcancelclosetime();
    if (ddmenuitem) ddmenuitem.style.display = 'none';
    ddmenuitem = document.getElementById(id);
    ddmenuitem.style.display = 'block';
}

/**
 *  This function close the menu if user clicks the left or right menu items.
 * @function mclose
 * @author Daye
 */
function mclose() {
    if (ddmenuitem) ddmenuitem.style.display = 'none';
}

/**
 *  This function set Timeout to close the menu popup.
 * @function mclosetime
 * @author Daye
 */
function mclosetime() {
    closetimer = window.setTimeout(mclose, timeout);
}

/**
 *  This function cancel Timeout for closing menu popup.
 * @function mcancelclosetime
 * @author Daye
 */
function mcancelclosetime() {
    if (closetimer) {
        window.clearTimeout(closetimer);
        closetimer = null;
    }
}


