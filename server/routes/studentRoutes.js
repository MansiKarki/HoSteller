import express from "express";
import jwt from "jsonwebtoken";
import {
  createNightOut,
  getMyNightOuts,
  createMaintenance,
  getMyMaintenance,
} from "../controllers/studentController.js";

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalid" });
  }
};

const router = express.Router();

router.post("/nightout", protect, createNightOut);
router.get("/nightout", protect, getMyNightOuts);
router.post("/maintenance", protect, createMaintenance);
router.get("/maintenance", protect, getMyMaintenance);

export default router;
