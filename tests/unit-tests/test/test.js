// Load configuration

var env = process.env.NODE_ENV || 'development',
    config = require('../../../server/config/config.js')[env],
    localConfig = require('../../config-test.json')
    ;

var should = require('should'),
    supertest = require('supertest'),
    superagent = require('superagent'),
    agent = superagent.agent(),
    app = require('../../../server/server.js');

describe('API Routing for CRUD operations on users.',function(){
  var request = supertest(localConfig.host + ":" + config.port + "/" + localConfig.api_path);

  var tmpUser = null,
      tmpUserResponse,
      cookies;

  before(function(done){
    done();
  });

  // describe('CREATE users.',function(){
  //   it('Should POST /users',function(done){
  //     request.post('/users')
  //            .send({
  //              "username": "arthurstomp@gmail.com",
  //              "password": "RAWR!!!!",
  //            })
  //            .expect(200)
  //            .expect('Content-Type', /application.json/)
  //            .expect('Content-Type', 'utf-8')
  //            .end(function (err,res) {
  //              if(err) throw err;
  //
  //              var resJson = JSON.parse(res.text),
  //                  user;
  //
  //              if(resJson.err) throw resJson.err;
  //
  //              resJson
  //               .should.have.property('meta')
  //               .and.have.property('action').be.exactly('create');
  //
  //              resJson
  //               .should.have.property('user');
  //
  //              user = resJson.user;
  //
  //              user
  //               .should.have.property('_id');
  //              user
  //               .should.have.property('username').be.exactly('arthurstomp@gmail.com');
  //              user
  //               .should.have.property('password');
  //
  //              tmpUser = user;
  //
  //              cookies = res.headers['set-cookie'].pop().split(';')[0];
  //
  //              done();
  //            });
  //
  //   });
  // });

  describe('LOGIN user.',function(){
    it('Should POST /login.',function(done){
      agent.post('/login')
        .send({
          // username : tmpUser.username,
          username : 'arthurstomp@gmail.com',
          password : 'RAWR!!!!'
          })
        // .expect(200)
        // .expect('Content-Type',/application.json/)
        // .expect('Content-Type','utf-8')
        .end(function (err,res) {
          if(err) throw err;
          var userJson = JSON.parse(res.text).user;
          // userJson.should.have.property("username").be.exactly(tmpUser.username);
          userJson.should.have.property("username").be.exactly('arthurstomp@gmail.com');
          // userJson.should.have.property("_id").be.exactly(tmpUser._id);
          userJson.should.have.property("_id").be.exactly('55641e048eee8bab9e18df7e');
          // cookies = res.headers['set-cookie'].pop().split(';')[0];
          // console.log("******Cookies Login********");
          // console.log(cookies);
          done();
        });
    });
  });

  describe('DELETE user.',function(){
    it('Should POST /users/:_id.',function(done){
      // request.cookies = cookies;
      // // request.del('/users/'+tmpUser._id)
      // console.log('*******Cookies Delete********');
      // console.log(cookies);
      // console.log(request);
      agent.del('/users/55641e048eee8bab9e18df7e')
            //  .expect(200)
            //  .expect('Content-Type', /application.json/)
            //  .expect('Content-Type', 'utf-8')
             .end(function (err,res) {
               if (err) throw err;
               var jsonRes = JSON.parse(res.text);
               if(jsonRes.err) throw jsonRes.err;
               should.not.exist(jsonRes.err);
               tmpUser = null;
               done();
             });
    });
  });

});

// describe('API Routing for CRUD operations on books', function () {
//
//     var request = supertest(localConfig.host + ":" + config.port + "/" + localConfig.api_path);
//
//     var tmpBookId = null;
//     var tmpBookResponse;
//
//     before(function (done) {
//         done();
//     });
//
//     describe('CREATE book', function () {
//         it('Should POST /books', function (done) {
//             request
//                 .post('/books')
//                 .send({
//                     "title": "Great book!" + Date.now(),
//                     "author": "John Doe",
//                     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
//                 )
//                 .expect(200)                                                // supertest
//                 .expect('Content-Type', /application.json/)                 // supertest
//                 .expect('Content-Type', 'utf-8')                            // supertest
//                 .end(function (err, res) {
//                     if (err) {
//                         throw err;
//                     }
//                     JSON.parse(res.text)
//                         .should.have.property('meta')
//                         .and.have.property('action').be.exactly('create');
//                     JSON.parse(res.text)
//                         .should.have.property('err').be.exactly(null);
//                     res.statusCode.should.be.exactly(200);
//                     res.type.should.be.exactly('application/json');
//                     res.charset.should.be.exactly('utf-8');
//                     JSON.parse(res.text)
//                         .should.have.property('doc')
//                         .and.have.property('author')
//                         .be.exactly('John Doe');
//
//                     tmpBookId = JSON.parse(res.text).doc._id;
//
//                     done();
//                 });
//         });
//     });
//
//     describe('RETRIEVE all books', function () {
//
//         it('Should GET /books', function (done) {
//             request
//                 .get('/books')
//                 .expect(200)                                                // supertest
//                 .expect('Content-Type', /application.json/)                 // supertest
//                 .expect('Content-Type', 'utf-8')                            // supertest
//                 .end(function (err, res) {
//                     if (err) {
//                         throw err;
//                     }
//
//                     JSON.parse(res.text)
//                         .should.have.property('meta')
//                         .and.have.property('action').be.exactly('list');
//                     res.statusCode.should.be.exactly(200);
//
//                     tmpBookResponse = res.text;
//
//                     done();
//                 });
//         });
//     });
//
//     describe('RETRIEVE 1 book', function () {
//         it('Should GET /books/{id}', function (done) {
//             request
//                 .get('/books/' + tmpBookId)
//                 .expect('Content-Type', /application.json/)
//                 .expect(200)
//                 .end(function (err, res) {
//                     if (err) {
//                         throw err;
//                     }
//                     JSON.parse(res.text)
//                         .should.have.property('meta')
//                         .and.have.property('action')
//                         .be.exactly('detail');
//                     JSON.parse(res.text)
//                         .should.have.property('doc')
//                         .and.have.property('author')
//                         .be.exactly('John Doe');
//                     res.statusCode.should.be.exactly(200);
//                     done();
//                 });
//         });
//     });
//
//     describe('UPDATE 1 book', function () {
//         it('Should PUT /books/{id}', function (done) {
//             request
//                 .put('/books/' + tmpBookId)
//                 .send({
//                     "doc": {
//                         "title": "Good book " + Date.now(),
//                         "author": "Ghostwriter",
//                         "description": "Book is updated."
//                     }
//                 })
//                 .expect(200)                                                // supertest
//                 .expect('Content-Type', /application.json/)                 // supertest
//                 .expect('Content-Type', 'utf-8')                            // supertest
//                 .end(function (err, res) {
//                     if (err) {
//                         throw err;
//                     }
//
//                    JSON.parse(res.text)
//                         .should.have.property('meta')
//                         .and.have.property('action')
//                         .be.exactly('update');
//                     JSON.parse(res.text)
//                         .should.have.property('err')
//                         .be.exactly(null);
//                     JSON.parse(res.text)
//                         .should.have.property('doc')
//                         .and.have.property('author')
//                         .be.exactly('Ghostwriter');
//                     res.statusCode.should.be.exactly(200);
//                     done();
//                 });
//         });
//     });
//
//     describe('DELETE 1 book', function () {
//         it('Should DELETE /books/{id}', function (done) {
//             request
//                 .del('/books/' + tmpBookId)
//                 .expect(200)                                                // supertest
//                 .expect('Content-Type', /application.json/)                 // supertest
//                 .expect('Content-Type', 'utf-8')                            // supertest
//                 .end(function (err, res) {
//                     if (err) {
//                         throw err;
//                     }
//                     JSON.parse(res.text)
//                         .should.have.property('meta')
//                         .and.have.property('action').be.exactly('delete');
//                     JSON.parse(res.text)
//                         .should.have.property('doc')
//                         .and.have.property('ok')
//                         .be.exactly(1);
//                     JSON.parse(res.text)
//                         .should.have.property('doc')
//                         .and.have.property('n')
//                         .be.exactly(1);
//                     JSON.parse(res.text).should.have.property('err').be.exactly(null);
//                     res.statusCode.should.be.exactly(200);
//                     done();
//                 });
//         });
//     });
//
//     describe('RETRIEVE all books to verify that the original collection is restored.', function () {
//         it('Should GET /books', function (done) {
//             request
//                 .get('/books')
//                 .expect(200)                                                // supertest
//                 .expect('Content-Type', /application.json/)                 // supertest
//                 .expect('Content-Type', 'utf-8')                            // supertest
//                 .end(function (err, res) {
//                     if (err) {
//                         throw err;
//                     }
//
//                     JSON.parse(res.text)
//                         .should.have.property('meta')
//                         .and.have.property('action').be.exactly('list');
//                     res.statusCode.should.be.exactly(200);
//
//                     done();
//                 });
//         });
//     });
//
// });
