import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  url_img: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('products', productSchema);
