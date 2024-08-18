const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect to database
connectDB();

module.exports = app;
