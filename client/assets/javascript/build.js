var selectedImg = "";
var selectColor = "#ffffff";
var freeSpotColor = "blue";
var tileWidth = 130;
var tileHeight = 130;
var tileBorderWidth = 5;
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
 >>>>>>> 110ddfc54945f91cb41ccaf98a55a110260f7193
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
        tile.empty = true;

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
        tile.onclick = function () {
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
    tile.onclick = function () {
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

    if (evt.target.parentNode.id == "front") {
    }
    else {
        if (evt.target.parentNode.id == "back") {
            selectedTile = evt.target.id;
            if (evt.target.parentNode.empty == false) {
                if (previousTile != null) {
                    closeMenu(document.getElementById("vWrapper"));
                    closeMenu(document.getElementById("vWrapper2"));
                    deselectTile();
                } else if (selectedTile != previousTile) {


                    selectedObject = evt.target;
                    AddDeletePreview();

                    originalColor = getRightSelectedTile().style.backgroundColor;
                    previousTile = getRightSelectedTile().id;
                }
                openMenu(document.getElementById("vWrapper"));
                openMenu(document.getElementById("vWrapper2"));
            }
        }
    }
    return selectedTile;
}


/**
 *  This function handles the deselection of a tile
 * @function deselectTile()
 * @author Daye & Abdellatif
 */
function deselectTile() {

    var x = document.getElementById("tileColor");
    var res = x.options[x.selectedIndex].value;

    if (res != "color") {
        document.getElementById(previousTile).style.backgroundColor = res;
        document.getElementById("tileColor").value = "color";
    } else {
        document.getElementById(previousTile).removeChild(document.getElementById(previousTile).childNodes[0]);
        document.getElementById(previousTile).style.backgroundColor = originalColor;
    }
    closeMenu(document.getElementById("vWrapper"));
    closeMenu(document.getElementById("vWrapper2"));
    previousTile = null;
}

/**
 *  This function opens the menu popup if users click menu icon.
 * @function openMenu
 * @author Daye
 * @param target id which one occurs event
 */
function openMenu(target) {
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
    deleteTile(selectedObject);
    var i, tile;

    tile = getRightSelectedTile();
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

function getRightSelectedTile() {
    var i, tile;
    for (i = 0; i < skeletonSize; i++) {
        if (document.getElementById(selectedTile).id == document.getElementById("back").children[i].id) {
            tile = document.getElementById("back").children[i];
        }
    }
    return tile;
}

/*
 This function changes the color of the text
 @Author: Daye & Abdellatif
 =======
 /**
 *  This function change font color on the tile.
 * @function changeFontColor
 * @author Daye & Abdellatif
 * @param color color name string that user wants to change.
 * @return {object} tile that will be changed.
 >>>>>>> 110ddfc54945f91cb41ccaf98a55a110260f7193
 */
function changeFontColor(color) {
    var tile = getRightSelectedTile();
    if (color == null) {
        var x = document.getElementById("fontColor");
        var res = x.options[x.selectedIndex].value;
        tile.style.color = res;
        tile.style.borderColor = "black";
    }
    else {
        tile.style.color = color;
    }
    return tile;
}

/**
 *  This function change font size on the tile.
 * @function changeFontSize
 * @author Daye
 * @param fontsize size of font that user wants to change.
 * @return {object} tile that will be changed.
 */
function changeFontSize(fontSize) {
    var tile = getRightSelectedTile();
    if (fontSize == null) {
        var x = document.getElementById("fontSize");
        tile.style.fontSize = (x.options[x.selectedIndex].value).toString() + "px";
    }
    else {
        tile.style.fontSize = "13";
    }
    return tile;
}

/**
 *  This function change font style on the tile.
 * @function changeFontStyle
 * @author Daye
 */
function changeFontStyle() {
    var tile = getRightSelectedTile();
    var x = document.getElementById("fontStyle");
    if (x.options[x.selectedIndex].value == "italic") {
        tile.style.fontStyle = x.options[x.selectedIndex].value;
    } else if (x.options[x.selectedIndex].value == "underline") {
        tile.style.textDecoration = x.options[x.selectedIndex].value;
    } else {
        tile.style.fontWeight = x.options[x.selectedIndex].value;
    }
}

/**
 *  This function change font type on the tile.
 * @function changeFontType
 * @author Daye
 */
function changeFontType() {
    var tile = getRightSelectedTile();
    var x = document.getElementById("fontType");
    tile.style.fontFamily = x.options[x.selectedIndex].value;
}

/**
 *   This function handles the uploading of ta picture
 * @function previewFile
 * @author Daye & Abdellatif
 */
function previewFile() {
    var file, reader;
    var tile = getRightSelectedTile();

    file = document.querySelector('input[type=file]').files[0];
    reader = new FileReader();

    reader.onloadend = function () {
        var img = document.createElement("img");
        img.src = reader.result;
        img.style.height = tileWidth;
        img.style.width = tileHeight;

        document.getElementById(selectedTile).innerHTML = "";
        tile.style.backgroundImage = "url(" + img.src + ")";
        tile.style.backgroundSize = 'cover';

    };

    if (file) {
        reader.readAsDataURL(file);
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
    selectedTileObject.style.backgroundImage = null;
    selectedTileObject.innerText = "";
    deselectTile();
    return selectedTileObject;
}

/**
 * This function handles the rotation of an image
 * @function rotateTile
 * @author Daye
 * @param selectedTileObject tile that will be rotated.
 */
function rotateTile(selectedTileObject) {
    var tile = getRightSelectedTile();
    if (selectedTileObject == null) {
        tile.style.webkitTransform += 'rotate(45deg)';
        tile.style.overflow = "hidden";
    }
    else {
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

                target.style.width = event.rect.width + 'px';
                target.style.height = event.rect.height + 'px';

                x += event.deltaRect.left;
                y += event.deltaRect.top;

                target.style.webkitTransform = target.style.transform =
                    'translate(' + x + 'px,' + y + 'px)';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);

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
    ev.preventDefault();
    if (hasTile(ev)) {
        canSwap = false;
    }
    else {
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
    var tempDragClone, tempTargetClone;


    tempDragClone = currentDraggingTile.cloneNode(true);
    tempTargetClone = ev.target.cloneNode(true);

    ev.target.innerHTML = "";
    currentDraggingTile.innerHTML = "";

    ev.target.appendChild(tempDragClone);
    currentDraggingTile.appendChild(tempTargetClone);
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
    currentDraggingTile = ev.target;
    closeMenu(document.getElementById("vWrapper"));
    closeMenu(document.getElementById("vWrapper2"));
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
        skeleton.children[i].style.backgroundColor = freeSpotColor;
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
    var tempClone;
    ev.preventDefault();

    if (canSwap == false) {
        targetedDiv = document.getElementById(ev.toElement.id);

        tempClone = currentDraggingTile.cloneNode(true);
        if (targetedDiv.parentNode.id == "front") {
            tempClone.style.width = tileWidth * 3 + "px";
            tempClone.style.height = tileHeight * 5 + "px";
        }
        else {
            tempClone.style.width = tileWidth - tileBorderWidth - 4 + "px";
            tempClone.style.height = tileHeight - tileBorderWidth - 4 + "px";
        }
        targetedDiv.appendChild(tempClone);
        targetedDiv.style.borderWidth = "5px";

        targetedDiv.parentNode.empty = false;
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
        deleteTile(getRightSelectedTile());
    }
}

/**
 *  This function changes patterns on the tile.
 * @function changePattern
 * @author Daye
 */
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
    var btn = document.getElementById('flip_content');
    var content = document.getElementById('f1_card');
    var c = 0;
    if (btn != null) {
        btn.onclick = function () {
            closeMenu(document.getElementById("vWrapper"));
            closeMenu(document.getElementById("vWrapper2"));
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
        if (!$$parameters) $$parameters = {};
        if (_View.setIconSelectElement($$elementID)) {
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
            getRightSelectedTile().innerHTML = " ";
            getRightSelectedTile().style.backgroundImage = "url(" + _icons[_selectedIndex].iconFilePath + ")";
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
        componentIconImgElement.setAttribute('src', IconSelect.COMPONENT_ICON_FILE_PATH);
        componentIconElement.appendChild(componentIconImgElement);
        _View.boxScrollElement = document.createElement('div');
        _View.boxScrollElement.setAttribute('id', $$elementID + "-box-scroll");
        _View.boxScrollElement.setAttribute('class', 'box');
        _View.boxElement = document.createElement('div');
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


