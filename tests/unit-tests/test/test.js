// Load configuration

var env = process.env.NODE_ENV || 'development',
    config = require('../../../server/config/config.js')[env],
    localConfig = require('../../config-test.json')
    ;

var should = require('should'),
    supertest = require('supertest');

describe('API Routing for CRUD operations on books', function () {

    var request = supertest(localConfig.host + ":" + config.port + "/" + localConfig.api_path);

    var tmpBookId = null;
    var tmpBookResponse;

    before(function (done) {
        done();
    });

    describe('CREATE book', function () {
        it('Should POST /books', function (done) {
            request
                .post('/books')
                .send({
                    "title": "Great book!" + Date.now(),
                    "author": "John Doe",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                )
                .expect(200)                                                // supertest
                .expect('Content-Type', /application.json/)                 // supertest
                .expect('Content-Type', 'utf-8')                            // supertest
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('create');
                    JSON.parse(res.text)
                        .should.have.property('err').be.exactly(null);
                    res.statusCode.should.be.exactly(200);
                    res.type.should.be.exactly('application/json');
                    res.charset.should.be.exactly('utf-8');
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('author')
                        .be.exactly('John Doe');

                    tmpBookId = JSON.parse(res.text).doc._id;

                    done();
                });
        });
    });

    describe('RETRIEVE all books', function () {

        it('Should GET /books', function (done) {
            request
                .get('/books')
                .expect(200)                                                // supertest
                .expect('Content-Type', /application.json/)                 // supertest
                .expect('Content-Type', 'utf-8')                            // supertest
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('list');
                    res.statusCode.should.be.exactly(200);

                    tmpBookResponse = res.text;

                    done();
                });
        });
    });

    describe('RETRIEVE 1 book', function () {
        it('Should GET /books/{id}', function (done) {
            request
                .get('/books/' + tmpBookId)
                .expect('Content-Type', /application.json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action')
                        .be.exactly('detail');
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('author')
                        .be.exactly('John Doe');
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('UPDATE 1 book', function () {
        it('Should PUT /books/{id}', function (done) {
            request
                .put('/books/' + tmpBookId)
                .send({
                    "doc": {
                        "title": "Good book " + Date.now(),
                        "author": "Ghostwriter",
                        "description": "Book is updated."
                    }
                })
                .expect(200)                                                // supertest
                .expect('Content-Type', /application.json/)                 // supertest
                .expect('Content-Type', 'utf-8')                            // supertest
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                   JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action')
                        .be.exactly('update');
                    JSON.parse(res.text)
                        .should.have.property('err')
                        .be.exactly(null);
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('author')
                        .be.exactly('Ghostwriter');
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('DELETE 1 book', function () {
        it('Should DELETE /books/{id}', function (done) {
            request
                .del('/books/' + tmpBookId)
                .expect(200)                                                // supertest
                .expect('Content-Type', /application.json/)                 // supertest
                .expect('Content-Type', 'utf-8')                            // supertest
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('delete');
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('ok')
                        .be.exactly(1);
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('n')
                        .be.exactly(1);
                    JSON.parse(res.text).should.have.property('err').be.exactly(null);
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('RETRIEVE all books to verify that the original collection is restored.', function () {
        it('Should GET /books', function (done) {
            request
                .get('/books')
                .expect(200)                                                // supertest
                .expect('Content-Type', /application.json/)                 // supertest
                .expect('Content-Type', 'utf-8')                            // supertest
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('list');
                    res.statusCode.should.be.exactly(200);

                    done();
                });
        });
    });

});

describe("build.js", function () {
    it('Should verify the correct skeleton height for the back skeleton.', function() {
        var actualValue = app.createBackSkeleton(3 ,5).skeletonSize;

        expect(actualValue).toBe(15);
    });

    it('Should verify the color of the background of the skeleton.', function() {
        var expectedValue = 'red';
        var actualValue = tile.style.backgroundColor;

        expect(actualValue).toBe(expectedValue);
    });

    it('Should verify the correct skeleton size for the front skeleton.', function() {
        var actualValue = app.createFrontSkeleton(3 ,5).skeletonSize;

        expect(actualValue).toBe(15);
    });

    it('Should verify the color of the background of the front skeleton.', function() {
        var expectedValue = 'yellow';
        var actualValue = title.style.backgroundColor;

        expect(actualValue).toBe(expectedValue);
    });

    it('Should verify that the left menu is visible.', function() {

    });

    it('Should verify that the left menu closes.', function() {

    });

    it('Should verify that the tile color changes.', function() {

    });

    it('Should verify that text has been added to a tile', function() {

    });

    it('Should verify that the font color has changed.', function() {

    });

    it ('Should verify that the font style has changed.', function(){

    });

    it('Should verify that the font type has changed.', function() {

    });

    it("Should verify that a preview from the selected tile is created", function () {
        var expectedValue = 0;
        var actualValue = 1;
        expect(actualValue).toBe(expectedValue);
    });
    it("Should verify that a tile can be deleted", function () {
        var tile = document.createElement("div");
        selectedTile = tile;
        selectedTile.id = "tiletest"
        selectedTile.innerText = "something";
        deleteTile();
        var expectedValue = document.getElementById("tiletest").innerText;
        var actualValue = "";
        expect(actualValue).toBe(expectedValue);
    });
    it("Should verify that a tile can be rotated", function () {
        var expectedValue = 0;
        var actualValue = 1;
        expect(actualValue).toBe(expectedValue);
    });
    it("Should verify that a tile can be resized", function () {
        var expectedValue = 0;
        var actualValue = 1;
        expect(actualValue).toBe(expectedValue);
    });
    it("Should verify that a tile can be dropped", function () {
        var expectedValue = 0;
        var actualValue = 1;
        expect(actualValue).toBe(expectedValue);
    });
    it("Should verify that a tile can not be dropped", function () {
        var expectedValue = 0;
        var actualValue = 1;
        expect(actualValue).toBe(expectedValue);
    });
    it("Should verify that the hasTile returns true when a tile is at the clicked position", function () {
        var expectedValue = 0;
        var actualValue = 1;
        expect(actualValue).toBe(expectedValue);
    });
    it("Should verify that the hasTile returns false when there is no tile at the clicked position", function () {
        var expectedValue = 0;
        var actualValue = 1;
        expect(actualValue).toBe(expectedValue);
    });
    it("Should verify that it's possible to rag a tilet", function () {
        var expectedValue = 0;
        var actualValue = 1;
        expect(actualValue).toBe(expectedValue);
    });
    it("Should verify that the application shows with a color which spots are available", function () {
        var expectedValue = 0;
        var actualValue = 1;
        expect(actualValue).toBe(expectedValue);
    });
    it("Should verify that the application resets the tiles colors correctly to the original state", function () {
        var expectedValue = 0;
        var actualValue = 1;
        expect(actualValue).toBe(expectedValue);
    });
    it("Should verify that a tile gets placed in the targeted div", function () {
        var expectedValue = 0;
        var actualValue = 1;
        expect(actualValue).toBe(expectedValue);
    });
});
