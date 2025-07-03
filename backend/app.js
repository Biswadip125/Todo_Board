import express from "express";
import { connectDB } from "./config/dbConfig.js";
import dotenv from "dotenv";
const app = express();

dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(3000, async () => {
  await connectDB();

  console.log("server is running");
});
