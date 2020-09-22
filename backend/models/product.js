import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  url_img: {
    type: String,
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
