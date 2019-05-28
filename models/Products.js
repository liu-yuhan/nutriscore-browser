const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({

  barcode: {
    type: String,
    unique: true
  },
  user : {
    type : Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = Products = mongoose.model('product', ProductSchema);
