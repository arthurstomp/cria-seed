describe("build.js", function () {
    //TODO: use variables instead of values
    it('Should verify the correct tile height for the back skeleton.', function() {
        var actualValue = tileHeight;

        //expect(actualValue).toBe(150);
        expect(0).toBe(1);
    });

    //TODO: use variables instead of values
    it('Should verify the color of the background of the skeleton.', function() {
        var expectedValue = 'red';
        var actualValue = originalColor;

        //expect(actualValue).toBe(expectedValue);
        expect(0).toBe(1);
    });

    it('Should verify the correct skeleton size for the back skeleton.', function() {
        var div = document.createElement("div");
        div.id = "back";
        var actualValue = createBackSkeleton(3, 5);

        expect(actualValue).toBe(15);
    });
    it('Should verify the correct skeleton size for the front skeleton.', function() {
        var div = document.createElement("div");
        div.id = "back";
        var actualValue = createFrontSkeleton(3, 5);

        expect(actualValue).toBe(15);
    });

    it('Should verify the color of the background of the front skeleton.', function() {
        /*var expectedValue = 'yellow';
        var actualValue = title.style.backgroundColor;

        expect(actualValue).toBe(expectedValue);*/
        var expectedValue = 0;
        var actualValue = 1;
        expect(actualValue).toBe(expectedValue);
    });

    it('Should verify that the left menu is visible.', function() {
        var expectedValue = 0;
        var actualValue = 1;
        expect(actualValue).toBe(expectedValue);
    });

    it('Should verify that the left menu closes.', function() {
        var expectedValue = 0;
        var actualValue = 1;
        expect(actualValue).toBe(expectedValue);
    });

    it('Should verify that the tile color changes.', function() {
        var expectedValue = 0;
        var actualValue = 1;
        expect(actualValue).toBe(expectedValue);
    });

    it('Should verify that text has been added to a tile', function() {
        var expectedValue = 0;
        var actualValue = 1;
        expect(actualValue).toBe(expectedValue);
    });

    it('Should verify that the font color has changed.', function() {
        var expectedValue = 0;
        var actualValue = 1;
        expect(actualValue).toBe(expectedValue);
    });

    it ('Should verify that the font style has changed.', function(){
        var expectedValue = 0;
        var actualValue = 1;
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
