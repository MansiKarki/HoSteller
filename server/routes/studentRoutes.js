import express from "express";
import jwt from "jsonwebtoken";
import {
  createNightOut,
  getMyNightOuts,
  createMaintenance,
  getMyMaintenance,
} from "../controllers/studentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/nightout", protect, createNightOut);
router.get("/nightout", protect, getMyNightOuts);
router.post("/maintenance", protect, createMaintenance);
router.get("/maintenance", protect, getMyMaintenance);

export default router;
