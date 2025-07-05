import express from "express";
import { connectDB } from "./config/dbConfig.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.route.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

app.listen(3000, async () => {
  await connectDB();

  console.log("server is running");
});
