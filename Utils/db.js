const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const URL = process.env.MONGO_URI;

// mongoose.connect('mongodb://localhost:27017/')

const connectDB = async () => {
  try {
    const con = await mongoose.connect(URL);
    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
