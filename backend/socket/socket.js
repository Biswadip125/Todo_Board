import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://todo-board-chi.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

export const usersocketMap = {};

io.on("connection", (socket) => {
  console.log(socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== undefined) {
    console.log(userId);
    usersocketMap[userId] = socket.id;
  }

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete usersocketMap[userId];
  });
});

io.emit("getOnlineUsers", Object.keys(usersocketMap));

export { app, io, server };
