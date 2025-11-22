import { enviarCorreo } from "./mailer.js";
import dotenv from "dotenv";
dotenv.config();

export async function enviarCorreoDeRegistro(email) {
  await enviarCorreo({
    from: `"Mi App" <${process.env.OUTLOOK_USER}>`,
    to: email,
    subject: "Bienvenido a Mi App",
    html: `<h1>¡Hola!</h1><p>Gracias por registrarte.</p>`,
  });
}