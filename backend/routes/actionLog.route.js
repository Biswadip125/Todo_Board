import { Router } from "express";
import { getAllLogs } from "../controllers/actionLog.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = Router();

router.get("/", isAuthenticated, getAllLogs);

export default router;
