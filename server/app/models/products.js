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
    imgPath : {type: String},
    transactions : [{type : Schema.Types.ObjectId, ref : 'Transaction'}],
  });

  module.exports = mongoose.model(modelName,productSchema);

  productSchema.pre('save',true, function(next,done){
    console.log("pre save product");
    var product = this;
    if(!product.isModified('subProducts')){
      console.log("subProduct is not modified");
      return next();
    }
    product.totalPrice = product.soloPrice;
    product.combinedPrice = 0;
    mongoose
      .model('Product')
      .find()
      .where('_id').in(product.subProducts)
      .exec(function(err,subProducts){
        subProducts.forEach(function(subProduct){
          console.log(subProduct);
          product.combinedPrice += subProduct.totalPrice;
          product.totalPrice += subProduct.totalPrice;
        });
        console.log("total price = "+product.totalPrice);
        next();
        done();
      });
  });

}());
