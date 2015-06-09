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
    position : {
      skeleton : {type : Boolean, default : false},
      isFront : {type : Boolean, default : true},
      x : {type : Number},
      y : {type : Number},
    },
    amount : {type : Number, required : true},
    soloPrice : {type : Number, required : true},
    totalPrice : {type : Number},
    createdAt : {type: Date, default : Date.now()},
    updatedAt : {type : Date, default : Date.now()},
  });

  module.exports = mongoose.model(modelName,transactionSchema);

  transactionSchema.method.updateTotalPrice = function(){
    var transaction = this;
    transaction.totalPrice = transaction.soloPrice * transaction.amount;
  };

  transactionSchema.pre('save',function(next){
    var transaction = this;
    transaction.updatedAt = Date.now();
    transaction.updateTotalPrice();
  });

  transactionSchema.pre('update',function(next){
    var transaction = this;
    transaction.updatedAt = Date.now();
  });
}());
