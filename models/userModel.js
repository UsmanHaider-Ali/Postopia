const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({});

const user = mongoose.model("User", userSchema);

model.exports = user;
