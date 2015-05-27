/*jslint node:true */
/*jslint white: true */
(function () {
  'use strict';

  var mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      productSchema,
      modelName = "Product";

  productSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    soloPrice: {type: Number, default: 1000000},
    combinedPrice: {type: Number, default: 1000000},
    subProducts: [Schema.Types.ObjectId],
    totalPrice: {type:Number},
    specification: Schema.Types.Mixed,
    categories: [String],
  });

  module.exports = mongoose.model(modelName,productSchema);
}());
