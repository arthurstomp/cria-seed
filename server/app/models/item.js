/*jslint node:true */
/*jslint white: true */
(function() {
  'use strict';
  var mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      itemSchema,
      modelName = "Item";

  itemSchema = new Schema({
    productId : {type: Schema.Types.ObjectId, ref : 'Product', required : true},
    ownerId : {type: Schema.Types.ObjectId, ref : 'User', required : true},
    customization : Schema.Types.Mixed,
    transaction : {type : Schema.Types.ObjectId, ref : 'Transaction', required : true},
    createdAt : {type: Date, default : Date.now()},
    updatedAt : {type : Date, default : Date.now()},
  });
  
  module.exports = mongoose.model(modelName,itemSchema);
}());
