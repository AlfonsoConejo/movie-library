import crypto from "crypto";


function generarTokenConfirmacionEmail() {
    //Generamos un nuevo token para el usuario
    const verifyEmailToken = crypto.randomBytes(32).toString("hex");
                        
    //Obtenemos la fecha de creación y expiración del token
    const createdAt = new Date();
    const expiresAt = new Date(createdAt);
    expiresAt.setDate(expiresAt.getDate() + 1); //Un día después

    return {verifyEmailToken, createdAt, expiresAt};
};

export { generarTokenConfirmacionEmail }