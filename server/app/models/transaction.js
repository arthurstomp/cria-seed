/*jslint node:true */
/*jslint white: true */
(function() {
  'use strict';
  var mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      transactionSchema,
      modelName = "Transaction";

  transactionSchema = new Schema({
    productId : {type: Schema.Types.ObjectId, ref : 'Product', required : true},
    ownerId : {type: Schema.Types.ObjectId, ref : 'User', required : true},
    customization : Schema.Types.Mixed,
    amount : {type : Number, required : true},
    createdAt : {type: Date, default : Date.now()},
    updatedAt : {type : Date, default : Date.now()},
  });

  module.exports = mongoose.model(modelName,transactionSchema);

  transactionSchema.pre('save',function(next){
    var transaction = this;
    transaction.updatedAt = Date.now();
  });
  
  transactionSchema.pre('update',function(next){
    var transaction = this;
    transaction.updatedAt = Date.now();
  });
}());
