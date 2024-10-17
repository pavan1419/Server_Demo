const e = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//create a user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// lets secure the password with bcryptjs;
userSchema.pre('save', async function () {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

// generateAuthToken method is used to generate a token for the user
userSchema.methods.generateAuthToken = async function () {
  try {
    
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      // process.env.JWT_SECRET is the secret key used to generate the token
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model('User', userSchema);
module.exports = User;
