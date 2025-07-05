import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = Router();

router
  .post("/", isAuthenticated, createTask)
  .get("/", isAuthenticated, getTasks)
  .put("/:id", isAuthenticated, updateTask)
  .delete("/:id", isAuthenticated, deleteTask);

export default router;
