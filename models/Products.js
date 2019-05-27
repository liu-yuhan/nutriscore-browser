const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  user: {
    type : Schema.Types.ObjectId,
    ref: 'users'
  },
  barcode: {
    type: String,
    unique: true
  },
  upvote: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  downvote: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments:[
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      date: {
        type: String,
        default: Date.now
      }
    }
  ]
});

module.exports = Products = mongoose.model('product', ProductSchema);
