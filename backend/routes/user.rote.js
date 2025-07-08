import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { getOtherUsers } from "../controllers/user.controller.js";

const router = Router();

router.get("/", isAuthenticated, getOtherUsers);

export default router;
