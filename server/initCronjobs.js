import cron from 'node-cron';
import { getDb } from './db.js';
import { enviarCorreoDeRegistro } from "./mailController.js";
import { generarTokenConfirmacionEmail } from './utils.js';
import crypto from "crypto";

function initCronjobs(){

    //Cronjob para eliminar a los usuarios que tengan más de 90 días sin confirmar su cuenta de correo electrónico
    cron.schedule('0 0 * * *', async () => {
        const db = getDb(); // obtiene la DB ya conectada

        try{
            console.log('[CRON] Iniciando limpieza de usuarios con correo no confirmado...');

            const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

            const result = await db.collection("users").deleteMany({
                confirmed: false,
                createdAt: { $exists: true, $lt: ninetyDaysAgo }
            });

            console.log(
            `[CRON] Limpieza completada. Usuarios eliminados: ${result.deletedCount}`
            );
        } catch (error){
            console.error('[CRON] Error al limpiar usuarios con correo no confirmado:', error);
        }
    });

    //Cronjob para reenviar el correo a todos los usuarios a quienes no les llegó y ya pasaron 10 minutos
    cron.schedule('0 * * * *', async () => {
        const db = getDb(); // obtiene la DB ya conectada
        try{
            const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
            console.log('[CRON] Iniciando envío de correos de confirmación retrasados...');

            const cursor = db.collection("users").find(
                {
                    emailSent: false,
                    createdAt: { $exists: true, $lt: tenMinutesAgo },
                },
                {
                    projection: { _id: 1, email: 1, emailSent: 1 },
                }
            );

            for await (const user of cursor) {
                try {
                    //Borramos los tokens anteriores emitidos para el usuario
                    await db
                        .collection("account_confirm_tokens")
                        .deleteMany({ userId:user._id });

                    //Creamos un nuevo token
                    const { verifyEmailToken, createdAt, expiresAt } = generarTokenConfirmacionEmail();
                    
                    //Cargamos los datos a la colección account_confirm_tokens
                    await db.collection("account_confirm_tokens").insertOne({ 
                        userId: user._id,
                        confirmationToken: verifyEmailToken,
                        createdAt: createdAt,
                        expiresAt: expiresAt
                    });

                    //Enviamos el correo
                    await enviarCorreoDeRegistro(user.email, verifyEmailToken);
                    await db.collection("users").updateOne({ _id: user._id },{ $set: { emailSent: true } });
                } catch (errCorreo) {
                    console.error("[CRON] Error en el envío de correo de registro:", errCorreo);
                }
            }

            console.log('[CRON] Correos enviados exitosamente.');
        }
        catch(error){
            console.error('[CRON] Error al enviar correo de confirmación:', error);
        };
    });
}

export {initCronjobs};