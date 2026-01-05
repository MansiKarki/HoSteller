require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
           auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
}
        });

   let mailOptions = {
    from: `"Hosteller Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: subject,
    text: `
Name: ${name}
Email: ${email}
Message: ${message}
    `,
    replyTo: email
};


        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true });

    } catch (error) {
        res.status(500).json({ success: false });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
