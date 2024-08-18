const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://usmanhaiderali:7i9mVy6iYBwo7W15@postopia.kzlrp.mongodb.net/?retryWrites=true&w=majority&appName=Postopia"
    )
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log("MongoDB connection error: ", err);
    });
};

module.exports = connectDB;
