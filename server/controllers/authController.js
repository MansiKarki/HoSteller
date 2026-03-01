import Student from "../models/Student.js";
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import mongoose from "mongoose";


/* =================================
   LOGIN
================================= */
export const login = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Database is currently unavailable. Please try again in a few moments." });
  }

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
    console.error("Login Error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};


const isPasswordStrong = (password) => {
  const minLength = 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return password.length >= minLength && hasUpper && hasLower && hasNumber && hasSpecial;
};

/* =================================
   SIGNUP
================================= */
export const signup = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Database is currently unavailable. Please try again in a few moments." });
  }

  const { role, name, email, rollNo, adminId, password } = req.body;

  if (!isPasswordStrong(password)) {
    return res.status(400).json({ message: "Password does not meet strength requirements" });
  }

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

/* =================================
   FORGOT PASSWORD
================================= */
export const forgotPassword = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Database is currently unavailable. Please try again in a few moments." });
  }

  const { email, role } = req.body;

  try {
    let user;
    if (role === "student") {
      user = await Student.findOne({ email });
    } else if (role === "admin") {
      user = await Admin.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found with this email" });
    }

    // Get reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token and set resetPasswordToken field
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set expire
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 60 minutes

    console.log(`Sending reset link to ${user.email} (role: ${role})`);
    await user.save();
    console.log("User updated with reset token.");

    // Create reset url
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}/${role}`;

    const message = `Hello,\n\nYou requested a password reset for your HoSteller account. Please click the button in your email client or the link below to set a new password:\n\n${resetUrl}\n\nThis link expires in 10 minutes.\n\nBest regards,\nThe HoSteller Team`;

    const htmlMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="${process.env.FRONTEND_URL || 'http://localhost:5173'}/logo.png" alt="HoSteller Logo" style="width: 80px; height: 80px;">
        </div>
        <h2 style="color: #16a34a; text-align: center;">HoSteller</h2>
        <p>Hello,</p>
        <p>You requested a password reset for your HoSteller account. To proceed, please click the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        <p style="font-size: 14px; color: #555;"><strong>Note:</strong> This link is valid for 10 minutes. If you did not request this, you can safely ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 11px; color: #888; text-align: center;">You are receiving this because a password reset was requested for your account.<br>The HoSteller Team</p>
      </div>
    `;

    try {
      console.log("Setting up transporter...");
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      console.log("Sending mail...");
      await transporter.sendMail({
        from: `"HoSteller" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "HoSteller - Password Reset Request",
        text: message,
        html: htmlMessage,
      });

      console.log("Email sent successfully.");
      res.status(200).json({ message: "Password reset instructions have been sent to your email." });
    } catch (err) {
      console.error("Nodemailer Error:", err);
      try {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
      } catch (saveErr) {
        console.error("Cleanup Error:", saveErr);
      }

      return res.status(500).json({ message: "Email could not be sent. Please check your network or try again later." });
    }
  } catch (error) {
    console.error("ForgotPassword Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =================================
   RESET PASSWORD
================================= */
export const resetPassword = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Database is currently unavailable. Please try again in a few moments." });
  }

  const { password, role } = req.body;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    console.log(`Received Reset Request: Role=${role}, TokenParam=${req.params.resetToken}`);
    console.log(`Searching for Hashed Token: ${resetPasswordToken}`);

    let user;
    if (role === "student") {
      user = await Student.findOne({ resetPasswordToken });
    } else if (role === "admin") {
      user = await Admin.findOne({ resetPasswordToken });
    }

    if (!user) {
      console.log("No user found with this reset token.");
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    if (user.resetPasswordExpire < Date.now()) {
      console.log("Token found but has expired.");
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    console.log("User found and token is valid. Proceeding to update password...");

    // Set new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    console.log("Password updated successfully.");

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("ResetPassword Catch Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
