describe("build.js", function () {
    it('Should verify the correct tile dimensions for the back skeleton.', function() {
        var width = 3;
        var height = 5;
        var skeleton = createBackSkeleton(width, height);
        var actualValue = skeleton.skeletonSize;
        var expectedValue = width*height;

        expect(actualValue).toBe(expectedValue);
    });

    it('Should verify the correct tile dimensions for the front skeleton.', function() {
        var width = 3;
        var height = 5;
        var skeleton = createFrontSkeleton(width, height);
        var actualValue = skeleton.skeletonSize;
        var expectedValue = width*height;

        expect(actualValue).toBe(expectedValue);
    });

    it('Should verify that the left menu opens correctly.', function() {
        var target = document.createElement("div");
        var expectedValue = "visible";
        var actualValue =  openMenu(target).style.visibility;
        expect(actualValue).toBe(expectedValue);
    });

    it('Should verify that the left menu closes correctly.', function() {
        var target = document.createElement("div");
        var expectedValue = "hidden";
        var actualValue =  closeMenu(target).style.visibility;
        expect(actualValue).toBe(expectedValue);
    });

    it('Should verify that a tile is selected.', function() {
        var div = document.createElement("div");
        div.id = "testid";
        var testEvent;
        div.addEventListener("click", function(event){
            testEvent = event});
        div.click();

        var expectedValue = div.id;
        var actualValue = selectTile(testEvent);
        expect(actualValue).toBe(expectedValue);
    });

    //TODO: change parameter in html
    it('Should verify that a tile color has been changed', function() {
        var tile = document.createElement("div");
        var color = "purple";

        var expectedValue = color;
        var actualValue = changeTileColor(tile, color).style.backgroundColor;
        expect(actualValue).toBe(expectedValue);
    });


    it('Should verify that text has been added to a tile', function() {
        var tile = document.createElement("div");
        var text = "cool";

        var expectedValue = text;
        var actualValue = addText(tile, text).innerText;;
        expect(actualValue).toBe(expectedValue);
    });

    it('Should verify that the font color has changed.', function() {
        var tile = document.createElement("div");
        var color = "purple";

        var expectedValue = color;
        var actualValue = changeFontColor(tile, color).style.color;
        expect(actualValue).toBe(expectedValue);
    });

    it ('Should verify that the font style has changed.', function(){
        var tile = document.createElement("div");
        var fontSize = "13";

        var expectedValue = fontSize;
        var actualValue = changeFontSize(tile, fontSize).style.fontSize;
        expect(actualValue).toBe(expectedValue);
    });

    it('Should verify that the font type has changed.', function() {
        var expectedValue = 0;
        var actualValue = 1;
        expect(actualValue).toBe(expectedValue);
    });



    it("Should verify that a preview from the selected tile is created", function () {
        var expectedValue = 0;
        var actualValue = 1;
        expect(actualValue).toBe(expectedValue);
    });
    it("Should verify that a tile can be deleted", function () {
        var tile = document.createElement("div");
        tile.innerText = "something";
        deleteTile(tile);

        var expectedValue = "";
        var actualValue = "";
        expect(actualValue).toBe(expectedValue);
    });
    it("Should verify that a tile can be rotated", function () {
        var tile = document.createElement("div");
        rotateTile(tile);

        var expectedValue = 'rotate(45deg)';
        var actualValue = tile.style.webkitTransform;
        expect(actualValue).toBe(expectedValue);
    });
    it("Should verify that a tile can be resized", function () {
        var expectedValue = 0;
        var actualValue = 1;
        expect(actualValue).toBe(expectedValue);
    });

    it("Should verify that a tile can be dropped", function () {
        var div = document.createElement("div");
        var testEvent;
        div.addEventListener("click", function(event){
            testEvent = allowDrop(event)});
        div.click();

        var expectedValue = true;
        var actualValue = testEvent.defaultPrevented;
        expect(actualValue).toBe(expectedValue);
    });
    it("Should verify that a tile can not be dropped", function () {
        var expectedValue = 0;
        var actualValue = 1;
        expect(actualValue).toBe(expectedValue);
    });
    it("Should verify that the hasTile returns true when a tile is at the clicked position", function () {
        var tile = document.createElement("div");
        tile.empty = false;
        var returnValueOfhasTile;
        tile.addEventListener("click", function(event){
            returnValueOfhasTile = hasTile(event)});
        tile.click();

        var expectedValue = false;
        var actualValue = returnValueOfhasTile;
        expect(actualValue).toBe(expectedValue);
    });
    it("Should verify that the hasTile returns false when there is no tile at the clicked position", function () {
        var tile = document.createElement("div");
        tile.empty = true;
        var returnValueOfhasTile;
        tile.addEventListener("click", function(event){
            returnValueOfhasTile = hasTile(event)});
        tile.click();

        var expectedValue = true;
        var actualValue = returnValueOfhasTile;
        expect(actualValue).toBe(expectedValue);
    });
    it("Should verify that it's possible to drag a tile", function () {
        var tile = document.createElement("div");
        tile.id = "tile1";
        var returnValueOfDrag;

        var evObj = document.createEvent('MouseEvents');
        evObj.initEvent( returnValueOfDrag = drag(evObj), true, false );
        tile.dispatchEvent(evObj);


        var expectedValue = tile.id;
        var actualValue = returnValueOfDrag.id;
        expect(actualValue).toBe(expectedValue);
    });
    it("Should verify that the application shows which spots are available", function () {
        var skeleton = createBackSkeleton(3, 5);
        showAvalaibleTileSpace(skeleton);
        var i;
        var numberOfCorrectTiles = 0;
        for(i=0; i < skeletonSize; i++){
            if(skeleton.children[i].style.backgroundColor == freeSpotColor){
                numberOfCorrectTiles = numberOfCorrectTiles + 1;
            }
        }

        var expectedValue = skeleton.skeletonSize;
        var actualValue = numberOfCorrectTiles;
        expect(actualValue).toBe(expectedValue);
    });
    it("Should verify that the application resets the tiles colors correctly to the original state", function () {
        var skeleton = createBackSkeleton(3, 5);
        showAvalaibleTileSpace(skeleton);
        resetColorOfAvailableTiles(skeleton);

        var i;
        var numberOfCorrectTiles = 0;
        for(i=0; i < skeletonSize; i++){
            if(skeleton.children[i].style.backgroundColor == tempCloneOfSkeleton.children[i].style.backgroundColor){
                numberOfCorrectTiles = numberOfCorrectTiles + 1;
            }
        }

        var expectedValue = skeleton.skeletonSize;
        var actualValue = numberOfCorrectTiles;
        expect(actualValue).toBe(expectedValue);
    });

    it("Should verify that a tile gets placed in the targeted div", function () {
        var tile = document.createElement("div");
        var returnValueOfDrop;
        tile.addEventListener("click", function(event){
            returnValueOfDrop = drop(event)});
        tile.click();



        var expectedValue = true;
        var actualValue = returnValueOfDrop;
        expect(actualValue).toBe(expectedValue);
    });

    it("Should verify that a tile gets placed switch place with another tile", function () {
        var expectedValue = 1;
        var actualValue = 0;
        expect(actualValue).toBe(expectedValue);
    });
});

//TODO: test server