import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Define el transporter globalmente
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

// Opcional: verificar la conexión SMTP
transporter.verify((error, success) => {
  if (error) {
    console.error("Error en SMTP:", error);
  } else {
    console.log("Conexión SMTP válida!");
  }
});

export async function enviarCorreo(mailOptions) {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error enviando correo:", error);
    throw error;
  }
}