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
});
