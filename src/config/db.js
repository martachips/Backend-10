const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to Project 10 Data Base');
  } catch (error) {
    console.log('Error', error);
  }
};

module.exports = { connectDB };
