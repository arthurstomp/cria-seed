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

  productSchema.methods.calculateCurrentStock = function(transactions,next,done){
    var transactionModel = mongoose.model('Transaction');
    if (this.transactions.length === 0) {
      next();
      done();
    }
    this.currentStock = 0;
    transactionModel
      .find()
      .where('_id')
      .in(transactions)
      .exec(function(err,transactions){
        transactions.forEach(function(transaction){
          this.currentStock += transaction.amount;
        });
        next();
        done();
      });
  };

  productSchema.methods.calculateTotalPrice = function(subProductsIds,next,done){
    console.log("pre save product");
    product.totalPrice = product.soloPrice;
    product.sumSubProductsPrice = 0;
    product.updatedAt = Date.now();
    mongoose
      .model('Product')
      .find()
      .where('_id').in(product.subProducts)
      .exec(function(err,subProducts){
        subProducts.forEach(function(subProduct){
          product.sumSubProductsPrice += subProduct.totalPrice;
          product.totalPrice += subProduct.totalPrice;
        });
        next();
        done();
      });
  };

  module.exports = mongoose.model(modelName,productSchema);

  productSchema.pre('save',true, function(next,done){
    var product = this;
    if (product.isModified('subProducts')) {
      product.calculateTotalPrice(product.subProducts,next,done);
    }
    if (product.isModified('transactions')) {
      product.calculateCurrentStock(product.transactions,next,done);
      console.log("*******product.currentStock = "+product.currentStock);
    }
    next();
    done();
  });

  productSchema.pre('update',function(next){
    var product = this;
    product.updatedAt = Date.now();
  });

}());
