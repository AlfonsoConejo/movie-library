import cron from 'node-cron';
import { getDb } from './db.js';

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
}

export {initCronjobs};