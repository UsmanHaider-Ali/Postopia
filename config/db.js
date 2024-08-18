const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  const uri = process.env.MONGO_URL_STRING;

  if (!uri) {
    throw new Error("Connecting string is not defined in .env file");
  }

  await mongoose
    .connect(uri)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log("MongoDB connection error: ", err);
    });
};

module.exports = connectDB;
