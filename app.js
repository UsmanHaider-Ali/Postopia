const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

app.use("/api/users", userRoutes);

module.exports = app;
