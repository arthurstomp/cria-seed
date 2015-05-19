/*jslint node:true */
(function() {
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
    specification: Schema.Types.Mixed,
    categories: [String],
  });


}());
