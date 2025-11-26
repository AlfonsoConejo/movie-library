import { enviarCorreo } from "./mailer.js";
import dotenv from "dotenv";
dotenv.config();

export async function enviarCorreoDeRegistro(email) {
  console.log(`Enviando al correo ${email}`);
  await enviarCorreo({
    from: `"Brible" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Confirma tu cuenta",
    html: `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f6f6f6; padding:24px 0;">
      <tr>
        <td align="center">
          <!-- Contenedor del email -->
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden;">
            <!-- Header con logo -->
            <tr>
              <td align="center" style="padding:16px 24px;">
                <img
                  src="https://movie-library-8w5d.onrender.com/brible-logo.png"
                  alt="Brible"
                  style="max-width:160px; width:100%; height:auto; display:block; margin:0 auto;"
                >
              </td>
            </tr>

            <!-- Contenido principal -->
            <tr>
              <td style="padding:24px; font-family:Arial, sans-serif; font-size:16px; color:#333333;">
                <h1 style="margin:0 0 16px; font-size:22px; font-weight:bold;">Confirma tu cuenta</h1>
                <p style="margin:0 0 12px;">Bienvenido a Brible, por favor confirma tu correo electrónico para acceder a todos los beneficios de una cuenta Brible.</p>
                <p style="margin:0 0 12px;">Si no realizaste ningún registro, por favor ignora este correo.</p>
                <p style="margin:0 0 20px;">Si tienes problemas con el botón, copia y pega el siguiente enlace en tu navegador:</p>
                <p style="margin:0 0 24px; word-break:break-all;">
                  <a href="{{VERIFY_URL}}" style="color:#2563eb; text-decoration:none;">{{VERIFY_URL}}</a>
                </p>

                <!-- Botón -->
                <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
                  <tr>
                    <td align="center" bgcolor="#2563eb" style="border-radius:999px;">
                      <a
                        href="{{VERIFY_URL}}"
                        style="display:inline-block; padding:12px 24px; font-family:Arial, sans-serif; font-size:16px; color:#ffffff; text-decoration:none; font-weight:bold;"
                      >
                        Confirmar ahora
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding:16px; font-family:Arial, sans-serif; font-size:12px; color:#888888;">
                <p style="margin:0 0 4px;">© ${new Date().getFullYear()} Brible</p>
                <p style="margin:0;">Pachuca de Soto, Hidalgo</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    `
  });
}