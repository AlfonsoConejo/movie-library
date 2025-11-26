import { enviarCorreo } from "./mailer.js";
import dotenv from "dotenv";
dotenv.config();

export async function enviarCorreoDeRegistro(email) {
  console.log(`Enviando al correo ${email}`);
  await enviarCorreo({
    from: `"Brible" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Bienvenido a Mi App",
    html: `<h1>¡Hola!</h1><p>Gracias por registrarte.</p>`,
  });
}