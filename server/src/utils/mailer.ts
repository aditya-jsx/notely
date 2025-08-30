import nodemailer = require("nodemailer");
import { EMAIL_USER, EMAIL_PASS } from "../config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export async function sendVerificationEmail(email: string, otp: string) {
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Verify Your Email for Notely",
    html: `
      <h2>Email Verification</h2>
      <p>Thank you for signing up. Please use the following One-Time Password (OTP) to verify your email address:</p>
      <h3>${otp}</h3>
      <p>This OTP is valid for 10 minutes.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", email);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Could not send verification email.");
  }
}