/*jslint node:true */
/*jslint white: true */
(function () {
  'use strict';
  /**
   * Module dependencies.
   */
  var mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      userSchema,
      bcrypt = require('bcrypt'),
      modelName = "User",
      MAX_LOGIN_ATTEMPTS = 5,
      LOCK_TIME = 2 * 60 * 60 * 1000,
      SALT_WORK_FACTOR = 10,
      reasons;

  userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String,
            required: true,
            unique: true,
            match: [/^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please fill a valid email address']},
    password: {type: String, required: true},
    admin: {type: Boolean, required: true, default: false},
    created_at: {type: Date, required: true, default: Date.now},
    updated_at: {type: Date, required: true, default: Date.now},
    loginAttempts: {type: Number, required: true, default: 0},
    lockUntil: {type: Number},
    shoppingCart: {
      created_at: {type: Date},
      updated_at: {type: Date},
      products: [Schema.Types.ObjectId],
      totalPrice: {type: Number, default: 0}
    },
    address: {
      streetWithNumber: {type: String},
      zipcode: {type: String},
      city: {type:String},
      state: {type: String},
      country: {type: String}
    },
  },{collection: "users"});

  userSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2,
  };

  reasons = userSchema.statics.failedLogin;

  userSchema.virtual('isLocked').get(function() {
    // check for a future lockUntil timestamp
    return (this.lockUntil && this.lockUntil > Date.now());
  });

  userSchema.methods.incLoginAttempts = function(cb) {
    // if we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
      return this.model(modelName).update({
        $set: { loginAttempts: 1 },
        $unset: { lockUntil: 1 }
      }, cb);
    }

    // otherwise we're incrementing
    // var updates = { $inc: { loginAttempts: 1 } };
    this.loginAttempts += 1;
    // lock the account if we've reached max attempts and it's not locked already
    if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
      // updates.$set = { lockUntil: Date.now() + LOCK_TIME };
      this.lockUntil = Date.now() + LOCK_TIME;
    }
    // console.log(this.model(modelName));
    return this.save(cb);
    // return this.model(modelName).update(updates, cb);
  };

  userSchema.pre('update',function(next){
    var user = this;
    user.updated_at = Date.now;
  });

  userSchema.pre('save', function(next) {
      var user = this;

      // only hash the password if it has been modified (or is new)
      if (!user.isModified('password')){
        return next();
      }

      // generate a salt
      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
          if (err){
            return next(err);
          }

          // hash the password using our new salt
          bcrypt.hash(user.password, salt, function(err, hash) {
              if (err){
                return next(err);
              }

              // override the cleartext password with the hashed one
              user.password = hash;
              next();
          });
      });
  });

  userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err){
          return cb(err);
        }
        cb(null, isMatch);
    });
  };

  userSchema.statics.getAuthenticated = function(username, password, cb) {
    this.findOne({ email: username }, function(err, user) {
      if (err){
        return cb(err);
      }

      // make sure the user exists
      if (!user) {
        return cb(null, null, reasons.NOT_FOUND);
      }

      // check if the account is currently locked
      if (user.isLocked) {
        // just increment login attempts if account is already locked
        return user.incLoginAttempts(function(err) {
          if (err){
            return cb(err);
          }
          return cb(null, null, reasons.MAX_ATTEMPTS);
        });
      }

      // test for a matching password
      user.comparePassword(password, function(err, isMatch) {
        if (err){
          return cb(err);
        }

        // check if the password was a match
        if (isMatch) {
          console.log("isMatch");
          // if there's no lock or failed attempts, just return the user
          if (user.loginAttempts === 0 && user.lockUntil === 0.0){
            return cb(null, user);
          }
          // reset attempts and lock info
          user.loginAttempts = 0;
          user.lockUntil = 0.0;
          return user.save(function(err) {
            if (err){
              return cb(err);
            }
            return cb(null, user);
          });
        }

        // password is incorrect, so increment login attempts before responding
        user.incLoginAttempts(function(err) {
          console.log("isNotMatch");
          if (err){
            return cb(err);
          }
          return cb(null, null, reasons.PASSWORD_INCORRECT);
        });
      });
    });
  };

  module.exports = mongoose.model(modelName, userSchema);

}());
