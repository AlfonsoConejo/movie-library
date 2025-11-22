import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

try{
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.OUTLOOK_USER,
      pass: process.env.OUTLOOK_PASS,
    },
  });
} catch (err){
  console.log("Error en las credenciales" + err);
}


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