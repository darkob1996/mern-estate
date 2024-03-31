const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");

dotenv.config({
  path: "./config.env",
});

const app = express();

// ROUTES
app.use("/api/user", userRouter);

module.exports = app;
