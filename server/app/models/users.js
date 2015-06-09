/*jslint node:true */
/*jslint white: true */
(function () {
  'use strict';
  /**
   * Module dependencies.
   */
  var mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose'),
      Schema = mongoose.Schema,
      userSchema,
      modelName = "User",
      bcrypt = require('bcrypt');

  userSchema = new Schema({
    name: {type: String},
    username: {type: String,
            required: true,
            unique: true,
            match: [/^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please fill a valid email address']},
    admin: {type: Boolean, required: true, default: false},
    created_at: {type: Date, required: true, default: Date.now},
    updated_at: {type: Date, required: true, default: Date.now},
    shoppingCart: {
      created_at: {type: Date, default: Date.now},
      updated_at: {type: Date, default: Date.now},
      skeleton : Schema.Types.ObjectId,
      front : [Schema.Types.ObjectId],
      back : [Schema.Types.ObjectId],
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

  userSchema.plugin(passportLocalMongoose);

  userSchema.pre('update',function(next){
    var user = this;
    user.updated_at = Date.now;
  });

  module.exports = mongoose.model(modelName, userSchema);

}());
