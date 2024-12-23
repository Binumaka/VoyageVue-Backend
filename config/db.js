const mongoose = require("mongoose");

const connectDB = async () => {
  try{
    await mongoose.connect("mongodb://localhost:27017/voyagevue") 
        console.log("MongoDB Connected");
  } catch (e) {
    console.log("MongoDB not connected");
  }
};

module.exports = connectDB;