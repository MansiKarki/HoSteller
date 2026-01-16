require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto"); // 🔹 NEW

const app = express();
app.use(cors());


app.use(bodyParser.json());
app.use(express.static("public"));

/* ===========================
   EMAIL TRANSPORTER (COMMON)
=========================== */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* ===========================
   CONTACT US ROUTE (EXISTING)
=========================== */
app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"Hosteller Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: subject,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      replyTo: email
    });

    res.status(200).json({ success: true });

  } catch (error) {
    res.status(500).json({ success: false });
  }
});

/* ===========================
   🔐 RESET PASSWORD ROUTE (NEW)
=========================== */
app.post("/api/auth/reset-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    // Generate secure token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Reset link (change page if needed)
   const resetLink = `http://localhost:3000/new-password.html?token=${resetToken}`;


    await transporter.sendMail({
      from: `"HoSteller Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your HoSteller Admin Password",
      html: `
        <h2>Password Reset</h2>
        <p>You requested to reset your password.</p>
        <a href="${resetLink}"
           style="padding:10px 20px;background:#4CAF50;color:white;
           text-decoration:none;border-radius:5px;">
           Reset Password
        </a>
        <p>If you didn't request this, ignore this email.</p>
      `
    });

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Email sending failed" });
  }
});

/* ===========================
   SERVER START
=========================== */
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
