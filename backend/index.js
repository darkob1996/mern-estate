const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

dotenv.config({
  path: "./backend/config.env",
});

const app = express();

// BODY PARSER
app.use(express.json());

// ROUTES
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
