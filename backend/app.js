import express from "express";
import { connectDB } from "./config/dbConfig.js";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import taskRouter from "./routes/task.route.js";
import actionLogRouter from "./routes/actionLog.route.js";
import UserRouter from "./routes/user.rote.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";

dotenv.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/action-logs", actionLogRouter);

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

server.listen(3000, async () => {
  await connectDB();

  console.log("server is running");
});
