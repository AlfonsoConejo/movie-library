import cron from 'node-cron';
import { getDb } from './db.js';
import { enviarCorreoDeRegistro } from "./mailController.js";

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

            const result = await db.collection("users").find({
                emailSent: false,
                createdAt: { $exists: true, $lt: tenMinutesAgo }
            },
            { _id: 1, email: 1, emailSent: 1 });

            //Recorremos todos los usuarios obtenidos
            for await (const user of result) {
                //Enviamos el correo de registro al usuario
                try {
                    await enviarCorreoDeRegistro(user.email);
                    await db.collection("users").updateOne({ _id: user._id },{ $set: { emailSent: true } });
                } catch (errCorreo) {
                    console.error("Fallo el envío de correo de registro:", errCorreo);
                }
            }
        }
        catch(error){
            console.error('[CRON] Error al enviar correo de confirmación:', error);
        };
    });
}

export {initCronjobs};