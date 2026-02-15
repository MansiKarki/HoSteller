import NightOut from "../models/NightOut.js";
import Maintenance from "../models/Maintenance.js";
import Student from "../models/Student.js";
import jwt from "jsonwebtoken";


/* ================================
   Admin Protect Middleware
================================ */
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalid" });
  }
};


/* ================================
   NIGHT OUT CONTROLLERS
================================ */

// Get all pending night out requests
export const getPendingNightOuts = async (req, res) => {
  try {
    const requests = await NightOut.find({ status: "Pending" })
      .populate("studentId", "name room hostel")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};


// Approve / Reject night out
export const updateNightOutStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const nightOut = await NightOut.findById(req.params.id);
    if (!nightOut) {
      return res.status(404).json({ message: "Request not found" });
    }

    nightOut.status = status;
    await nightOut.save();

    res.json(nightOut);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};








/* ================================
   MAINTENANCE CONTROLLERS
================================ */

// Get all maintenance requests (with student details)
export const getAllMaintenance = async (req, res) => {
  try {
    const issues = await Maintenance.find()
      .populate("studentId", "name rollNo hostel")
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch maintenance requests" });
  }
};


// Update maintenance status
export const updateMaintenanceStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const issue = await Maintenance.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Request not found" });
    }

    issue.status = status;
    await issue.save();

    res.json({
      message: "Maintenance status updated",
      issue,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update maintenance status" });
  }
};

//Admin would assign hostel and mess to students. This would be a new controller function that takes in the student ID, hostel details, and mess details from the request body, updates the student's record, and returns the updated student information.


/* ================================
   STUDENT CONTROLLERS
================================ */

// Get all students (hide password)
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select("-password");

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students" });
  }
};


// Verify / Unverify student
export const verifyStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.isVerified = !student.isVerified;
    await student.save();

    res.json({
      message: "Student verification updated",
      isVerified: student.isVerified,
    });
  } catch (error) {
    res.status(500).json({ message: "Verification failed" });
  }
};


/* ================================
   NEW: Assign Hostel & Mess
================================ */

export const assignHostelAndMess = async (req, res) => {
  const { hostel, mess } = req.body;
  console.log("assignHostelAndMess called with ID:", req.params.id);

  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      console.log("Student not found for ID:", req.params.id);
      return res.status(404).json({ message: "Student not found" });
    }

    console.log("Student found:", student.name);
    
    // Handle hostel assignment
    if (hostel) {
      student.hostel = {
        name: hostel.name || "",
        block: hostel.block || "",
        room: hostel.room || "",
      };
    }

    // Handle mess assignment
    if (mess) {
      student.mess = {
        type: mess.type || "",
        timings: mess.timings || "",
      };
    }

    await student.save();

    res.json({
      message: "Hostel & Mess assigned successfully",
      student,
    });
  } catch (error) {
    console.error("Assignment error:", error);
    res.status(500).json({ message: "Assignment failed: " + error.message });
  }
};


export { protect };
