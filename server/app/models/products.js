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
    sumSubProductsPrice: {type: Number, default: 1000000},
    subProducts: [Schema.Types.ObjectId],
    totalPrice: {type:Number},
    specification: Schema.Types.Mixed,
    categories: [String],
    imgPath : {type: String},
    transactions : [{type : Schema.Types.ObjectId, ref : 'Transaction'}],
    currentStock : {type : Number},
  });

  productSchema.methods.calculateCurrentStock = function(transactions){
    var transactionModel = mongoose.model('Transaction');
    this.currentStock = 0;
    transactionModel
      .find()
      .where('_id')
      .in(transactions)
      .exec(function(err,transaction){
        this.currentStock += transaction.amount;
      });
  };

  module.exports = mongoose.model(modelName,productSchema);


  productSchema.pre('save',true, function(next,done){
    console.log("pre save product");
    var product = this;
    if (!product.isModified('subProducts')) { return next();}
    if(!product.isModified('transactions')){
      console.log("************transactions were not modified");
      return next();
    }
    product.totalPrice = product.soloPrice;
    product.sumSubProductsPrice = 0;
    product.updatedAt = Date.now();
    product.currentStock = product.calculateCurrentStock(product.transactions);
    console.log("*******product.currentStock = "+product.currentStock);
    mongoose
      .model('Product')
      .find()
      .where('_id').in(product.subProducts)
      .exec(function(err,subProducts){
        subProducts.forEach(function(subProduct){
          console.log(subProduct);
          product.sumSubProductsPrice += subProduct.totalPrice;
          product.totalPrice += subProduct.totalPrice;
        });
        console.log("total price = "+product.totalPrice);
        next();
        done();
      });
  });

  productSchema.pre('update',function(next){
    var product = this;
    product.updatedAt = Date.now();
  });

}());
