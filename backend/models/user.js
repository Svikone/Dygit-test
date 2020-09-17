import mongoose from 'mongoose';

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },

  email: {
    type: String,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
  },

  password: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('users', userSchema);
