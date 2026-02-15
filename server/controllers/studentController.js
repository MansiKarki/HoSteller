import NightOut from "../models/NightOut.js";
import Maintenance from "../models/Maintenance.js";

/* ---------------- NIGHT OUT ---------------- */

// Submit night out request
export const createNightOut = async (req, res) => {
  try {
    const { date, leaveTime, returnTime, reason } = req.body;

    const request = await NightOut.create({
      studentId: req.user.id,
      date,
      leaveTime,
      returnTime,
      reason,
      status: "Pending",
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: "Night out failed" });
  }
};

// Get student's night out requests
export const getMyNightOuts = async (req, res) => {
  try {
    const requests = await NightOut.find({
      studentId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};

/* ---------------- MAINTENANCE ---------------- */

// Submit maintenance request
export const createMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.create({
      studentId: req.user.id,
      category: req.body.category,
      description: req.body.description,
    });

    res.status(201).json(maintenance);
  } catch (error) {
    console.error("Create Maintenance Error:", error);
    res.status(500).json({ message: "Maintenance request failed" });
  }
};

// Get student's maintenance requests
export const getMyMaintenance = async (req, res) => {
  try {
    const issues = await Maintenance.find({
      studentId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch maintenance" });
  }
};
