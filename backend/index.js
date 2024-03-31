import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: "./config.env",
});

const app = express();

const DB = process.env.DATABASE_URL.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("Connected to DB."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Listening on port 3000.");
});
