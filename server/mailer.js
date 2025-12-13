import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});


export async function enviarCorreo(mailOptions) {
  const info = await transporter.sendMail({
    from: `"Brible" <${process.env.GMAIL_USER}>`,
    ...mailOptions,
  });
  return info;
}