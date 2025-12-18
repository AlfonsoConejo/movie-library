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

function generarTokenResetPassword() {
  const token = crypto.randomBytes(32).toString("hex");

  const tokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const createdAt = new Date();
  const expiresAt = new Date(createdAt);
  expiresAt.setMinutes(expiresAt.getMinutes() + 60); // 60 minutos

  return {
    token,       // se manda por email
    tokenHash,   // se guarda en BD
    createdAt,
    expiresAt
  };
}

export { generarTokenConfirmacionEmail, generarTokenResetPassword }