const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  barcode: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  date: {
    type: Date
  }
});

module.exports = Products = mongoose.model("product", ProductSchema);
