import express from "express";
import {
  getPendingNightOuts,
  updateNightOutStatus,
  getAllMaintenance,
  updateMaintenanceStatus,
   getAllStudents,
   verifyStudent,
  protect,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/nightout", protect, getPendingNightOuts);
router.put("/nightout/:id", protect, updateNightOutStatus);
router.get("/maintenance", protect, getAllMaintenance);
router.put("/maintenance/:id", protect, updateMaintenanceStatus);
router.get("/students", protect, getAllStudents);
router.put("/students/:id/verify", protect, verifyStudent);

export default router;
