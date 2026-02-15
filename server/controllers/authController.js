import Student from "../models/Student.js";
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


/* =================================
   LOGIN
================================= */
export const login = async (req, res) => {
  const { role, rollNo, password } = req.body;

  try {
    /* ---------- STUDENT LOGIN ---------- */
    if (role === "student") {
      const student = await Student.findOne({ rollNo });
      if (!student)
        return res.status(404).json({ message: "Student not found" });

      // 🔥 Debug: Check if password is unhashed
      if (!student.password.startsWith("$2")) {
        return res
          .status(500)
          .json({ message: "Stored password is not hashed. Please contact admin." });
      }

      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: student._id, role },
        process.env.JWT_SECRET
      );

      return res.json({ token, role });
    }

    /* ---------- ADMIN LOGIN ---------- */
    else if (role === "admin") {
      const { adminId, password } = req.body;

      const admin = await Admin.findOne({ adminId });
      if (!admin)
        return res.status(404).json({ message: "Admin not found" });

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: admin._id, role },
        process.env.JWT_SECRET
      );

      return res.json({ token, role });
    }

    else {
      res.status(400).json({ message: "Invalid role specified" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};


/* =================================
   SIGNUP
================================= */
export const signup = async (req, res) => {
  const { role, name, email, rollNo, adminId, password } = req.body;

  try {
    /* ---------- STUDENT SIGNUP ---------- */
    if (role === "student") {
      const existingEmail = await Student.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const existingRollNo = await Student.findOne({ rollNo });
      if (existingRollNo) {
        return res.status(400).json({ message: "Roll No already registered" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const student = new Student({
        name,
        email,
        rollNo,
        password: hashedPassword,
      });

      await student.save();

      const token = jwt.sign(
        { id: student._id, role: "student" },
        process.env.JWT_SECRET
      );

      return res
        .status(201)
        .json({ token, role: "student", message: "Signup successful" });
    }

    /* ---------- ADMIN SIGNUP ---------- */
    else if (role === "admin") {
      const existingEmail = await Admin.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const existingAdminId = await Admin.findOne({ adminId });
      if (existingAdminId) {
        return res.status(400).json({ message: "Admin ID already registered" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const admin = new Admin({
        name,
        email,
        adminId,
        password: hashedPassword,
      });

      await admin.save();

      const token = jwt.sign(
        { id: admin._id, role: "admin" },
        process.env.JWT_SECRET
      );

      return res
        .status(201)
        .json({ token, role: "admin", message: "Signup successful" });
    }

    else {
      res.status(400).json({ message: "Invalid role specified" });
    }
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
};


/* =================================
   GET CURRENT USER (NEW)
================================= */
export const getMe = async (req, res) => {
  try {
    if (req.user.role === "student") {
      const student = await Student.findById(req.user.id).select("-password");
      return res.json(student);
    }

    res.status(403).json({ message: "Access denied" });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};
