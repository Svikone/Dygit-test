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

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

});

export default mongoose.model('products', productSchema);
