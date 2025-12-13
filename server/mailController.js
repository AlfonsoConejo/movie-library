import { enviarCorreo } from "./mailer.js";
import dotenv from "dotenv";
dotenv.config();

export async function enviarCorreoDeRegistro(email, verifyEmailToken) {
  const verifyUrl = `https://movie-library-8w5d.onrender.com/confirmarCuenta/${verifyEmailToken}`;
  console.log(`Enviando al correo a ${email}`);
  await enviarCorreo({
    to: email,
    subject: "Confirma tu cuenta en Brible",
    html: `
      <!doctype html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <title>Confirma tu email</title>
          <style>
            /* Responsive */
            @media only screen and (max-width: 620px) {
              .body h1 {
                font-size: 28px !important;
                margin-bottom: 10px !important;
              }

              .body p,
              .body td,
              .body span,
              .body a {
                font-size: 16px !important;
              }

              .wrapper {
                padding: 10px !important;
              }

              .content {
                padding: 0 !important;
              }

              .container {
                padding: 0 !important;
                width: 100% !important;
              }

              .main {
                border-left-width: 0 !important;
                border-radius: 0 !important;
                border-right-width: 0 !important;
              }

              .btn table {
                width: 100% !important;
              }

              .btn a {
                width: 100% !important;
              }

              .img-responsive {
                height: auto !important;
                max-width: 100% !important;
                width: auto !important;
              }
            }

            @media all {
              .apple-link a {
                color: inherit !important;
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                text-decoration: none !important;
              }

              .btn-primary table td:hover {
                background-color: #2563eb !important;
              }
            }
          </style>
        </head>
        <body style="background-color: #eaebed; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="min-width: 100%; background-color: #eaebed; width: 100%;" width="100%" bgcolor="#eaebed">
            <tr>
              <td style="font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>

              <td class="container" style="font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
                <!-- Header -->
                <div style="padding: 20px 0;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="font-size: 14px; text-align: center;" align="center">
                        <a href="https://movie-library-8w5d.onrender.com" style="color: #2563eb; text-decoration: underline;">
                          <img src="https://movie-library-8w5d.onrender.com/brible-logo.png" height="40" alt="Brible" style="border: none; max-width: 100%;">
                        </a>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- Contenido -->
                <div class="content" style="box-sizing: border-box; max-width: 580px; padding: 10px; margin: 0 auto;">
                  <!-- Preheader invisible -->
                  <span style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">
                    Confirma tu cuenta en Brible.
                  </span>

                  <!-- Caja blanca principal -->
                  <table role="presentation" class="main" style="background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
                    <tr>
                      <td class="wrapper" style="box-sizing: border-box; padding: 20px; font-size: 14px; vertical-align: top;" valign="top">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td style="font-size: 14px; vertical-align: top;" valign="top">
                              <h1 style="color: #06090f; line-height: 1.4; margin: 0 0 16px; font-size: 28px; font-weight: bold; text-align: center;">
                                Confirma tu cuenta
                              </h1>

                              <p style="margin: 0 0 15px;">
                                Bienvenido a Brible, por favor confirma tu correo electrónico para acceder a todos los beneficios.
                              </p>

                              <p style="margin: 0 0 15px;">
                                Por seguridad, el enlace caducará dentro de 24 horas.
                              </p>

                              <!-- Botón -->
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="width: 100%;" width="100%">
                                <tr>
                                  <td align="center" style="padding-bottom: 15px;">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: auto;" width="auto">
                                      <tr>
                                        <td style="border-radius: 5px; text-align: center; background-color: #2563eb;" align="center" bgcolor="#2563eb">
                                          <a href="${verifyUrl}" target="_blank" style="border: 1px solid #2563eb; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #2563eb; color: #ffffff;">
                                            Confirmar ahora
                                          </a>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>

                              <p style="margin: 0 0 15px;">
                                Si no realizaste ningún registro, por favor ignora este correo.
                              </p>

                              <p style="margin: 0 0 15px;">
                                Si tienes problemas con el botón, copia y pega el siguiente enlace en tu navegador:
                              </p>

                              <p style="margin: 0 0 15px; word-break: break-all;">
                                <a href="${verifyUrl}" style="color: #2563eb; text-decoration: none;">${verifyUrl}</a>
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Footer -->
                  <div style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding: 10px 0; color: #9a9ea6; font-size: 12px; text-align: center;">
                          <span class="apple-link">Pachuca de Soto, Hidalgo, México</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #9a9ea6; font-size: 12px; text-align: center;">
                          Enviado por Brible
                        </td>
                      </tr>
                    </table>
                  </div>
                  <!-- END FOOTER -->
                </div>
              </td>

              <td style="font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
            </tr>
          </table>
        </body>
      </html>
    `
  });
}