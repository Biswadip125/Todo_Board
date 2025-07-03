import express from "express";
import { connectDB } from "./config/dbConfig.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
const app = express();

dotenv.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

app.listen(3000, async () => {
  await connectDB();

  console.log("server is running");
});
