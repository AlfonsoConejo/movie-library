import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" // mismo redirect del Playground
);


oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export async function enviarCorreo(mailOptions) {
  try {
    // 1. Obtener access token fresco
    const accessToken = await oAuth2Client.getAccessToken();

    // 2. Crear transporter con OAuth2
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token, // importante: .token
      },
    });

    // 3. Enviar correo
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error enviando correo:", error);
    throw error;
  }
}