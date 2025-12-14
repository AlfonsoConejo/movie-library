import { enviarCorreoDeRegistro } from "../mailController.js";
import { generarTokenConfirmacionEmail } from "../utils.js";
import { createAccessToken, createRefreshToken, sendRefreshTokenToDB } from "../jwtController.js";
import { auth } from "../middleware/auth.js";
import { ObjectId } from "mongodb";
import { getDb } from "../db.js";

// Revisamos si estamos en produccion
const isProd = process.env.ENVIRONMENT === "PRODUCTION";
//Configuramos los datos de la cookie
const refreshCookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

//Configuramos bcryp
import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;

import express from "express";
const router = express.Router();

router.post("/registrar", async (req, res) => {
  try {
    const db = getDb(); // obtiene la DB ya conectada

    // Obtenemos las variables que recibimos del body
    let { email, password } = req.body;

    // Normalizamos el correo
    if (email) {
      email = email.toLowerCase().trim();
    }
    
    //Verificamos que no se hayan enviado campos vacíos
    if(!email || !password ) {
      return res.status(400).json({ error: "Faltan campos obligatorios"});
    }

    //Revisamos que el correo no exista
    const correoDuplicado = await db.collection("users").findOne({email});
    if (correoDuplicado){
      return res.status(400).json({ error:"Este correo ya está registrado." });
    }

    //Hasheamos la contraseña con bcrypt
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    //Insertamos el correo en la base de datos
    const result = await db.collection("users").insertOne({
      email,
      passwordHash: passwordHash,
      confirmed: false,
      emailSent:false,
      createdAt: new Date(),
    });

    if(process.env.ENVIRONMENT === 'DEVELOPMENT'){
      //Creamos un nuevo token
      const { verifyEmailToken, createdAt, expiresAt } = generarTokenConfirmacionEmail();

      //Cargamos los datos a la colección account_confirm_tokens
      await db.collection("account_confirm_tokens").insertOne({ 
        userId: result.insertedId,
        confirmationToken: verifyEmailToken,
        createdAt: createdAt,
        expiresAt: expiresAt
      });
    
      //Enviamos el correo de registro al usuario
      try {
        await enviarCorreoDeRegistro(email, verifyEmailToken);
        await db.collection("users").updateOne({ _id: result.insertedId },{ $set: { emailSent: true } });
      } catch (errCorreo) {
        console.error("Falló el envío de correo de registro:", errCorreo);
      }
    }

    //Marcamos el estatus como exitoso
    res.status(201).json({
      success: true,
      insertedId: result.insertedId,
    });

  } catch (err) {
    console.error("Error al crear la cuenta.", err);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
});

//Ruta para validar el inicio de sesión
router.post("/login", async (req, res) => {
  try{
    const db = getDb(); // obtiene la DB ya conectada
    
    // Obtenemos las variables que recibimos del body
    let { email, password } = req.body;

    // Normalizamos el correo
    if (email) {
      email = email.toLowerCase().trim();
    }

    //Verificamos que no se hayan enviado campos vacíos
    if(!email || !password ) {
      return res.status(400).json({ error: "Faltan campos obligatorios"});
    }

    //Revisamos si el correo está registrado
    const usuario = await db.collection("users").findOne({email});
    if (!usuario){
      return res.status(400).json({ error:"Usuario o contraseña incorrectos." }) 
    }

    //Verificamos si la contraseña es válida con bcrypt
    const esValido = await bcrypt.compare(password, usuario.passwordHash);

    if(!esValido){
      //Marcamos estatus como que hubo error en la autorización
      return res.status(401).json({
        error: "Usuario o contraseña inválidos."
      });
    }

    //Recibimos AccessToken (JWT) y RefreshToken (opaco)
    const accessToken = createAccessToken(usuario._id);
    const refreshToken = createRefreshToken(); 
    await sendRefreshTokenToDB( usuario._id, refreshToken ); 

    const { passwordHash, ...usuarioSinPassword } = usuario;
    //Marcamos el estatus como exitoso
    res.cookie("refreshToken", refreshToken, refreshCookieOptions)
      .status(200)
      .json({
      success: true,
      accessToken,
      user: usuarioSinPassword,
    });
    console.log("Inicio de sesión exitoso");
  }
  catch (err){
    console.log("Error al iniciar sesión", err);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
});

//Ruta para refrescar el access token
router.post("/refresh-token", async (req, res) => {
  try {

    const db = getDb(); // obtiene la DB ya conectada  

    //Leemos el refresh token guardado en la cooke HTTPOnly
    const incomingToken = req.cookies.refreshToken;
    if (!incomingToken) {
      return res.status(401).json({ error: "No hay refresh token." });
    }

    //Buscamos si el token existe en la bd
    const stored = await db.collection("refreshTokens").findOne({ token: incomingToken });
    if (!stored) {
      return res.status(403).json({ error: "Refresh token inválido." });
    }

    //Resivamos si el token ya expiró
    if (new Date() > stored.expiresAt) {
      return res.status(403).json({ error: "Refresh token expirado." });
    }

    //Generamos un nuevo access token
    const newAccessToken = createAccessToken(stored.userId);

    //Creamos un nuevo refreshToken
    const newRefresh = createRefreshToken();

    //Eliminamos el refreshToken anterior
    await db.collection("refreshTokens").deleteOne( {token: incomingToken } );

    //Cargamos a la BD el nuevo refreshToken
    await sendRefreshTokenToDB(stored.userId, newRefresh);

    //Guardamos la nueva cookie
    res.cookie("refreshToken", newRefresh, refreshCookieOptions);

    //Devolvemos un nuevo access token
    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });

  } catch (err){
    console.log("Error en refresh-token:", err);
    return res.status(500).json({ error: "Error interno del servidor." });
  }

});

//Invalidamos access token para el logout
router.post("/logout", async (req, res) => {
  
  try {
    //Obtenemos el refresh token de las cookies
    const incomingToken = req.cookies.refreshToken

    //Si el token existe, lo eliminamos
    if (incomingToken) {
        const db = getDb();
        await db.collection("refreshTokens").deleteOne({ token: incomingToken });
    }
  
    //Borramos la cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
    });

    //Enviamos la respuesta
    return res.json({ success: true, message: "Sesión cerrada."});

  } catch (err) {
    console.log("Error en /api/logout:", err);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
});

// Obtener perfil del usuario con el access token
router.get("/me", auth, async (req, res) => {
  try{

    const userId = req.user.sub; // viene del token decodificado
    
    const db = getDb();

    const user = await db.collection("users").findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } } // no mandar password
    );

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/verificarCuenta", async (req, res) => {
  try{
    const db = getDb();
    const { token } = req.body || {};

    if (!token){
      return res.status(400).json({
        error: "Falta el token de confirmación.",
      });
    }

    // Buscamos si el token existe en la base de datos
    const infoToken = await db.collection("account_confirm_tokens").findOne({confirmationToken: token});
    if (!infoToken){
      return res.status(401).json({ error:"Enlace de confirmación inválido. Solicite uno nuevo." }) 
    }

    // Verificamos que el token no haya expirado
    if (infoToken.expiresAt < new Date()) {
      await db.collection("account_confirm_tokens").deleteOne({ _id: infoToken._id });
      return res.status(410).json({ error:"Enlace de confirmación vencido. Solicite uno nuevo." });
    }

    // Marcamos la cuenta del usuario como confirmada.
    const result = await db.collection("users").updateOne(
      { _id: infoToken.userId },
      { $set: { confirmed: true } }
    );

    if (result.matchedCount === 0) {
      await db.collection("account_confirm_tokens").deleteOne({ _id: infoToken._id });
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Borramos el token de la base de datos
    await db.collection("account_confirm_tokens").deleteOne({ _id: infoToken._id });

    return res.status(200).json({ mensaje: "Cuenta confirmada exitosamente."});

  } catch (error) {
    console.error("Error al verificar cuenta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/isEmailConfirmed", async (req, res) => {
  try{
    const db = getDb();

    // Leemos el refresh token de la cookie
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ loggedIn: false });
    }

    // Buscamos el token en la DB
    const tokenData = await db.collection("refreshTokens").findOne({ token: refreshToken });
    if (!tokenData) {
      return res.status(401).json({ loggedIn: false });
    }

    //Obtenemos el usuario
    const user = await db.collection("users").findOne(
      { _id: new ObjectId(tokenData.userId) },
      { projection: { confirmed: 1, email: 1 } }
    );

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json({
      loggedIn: true,
      confirmed: user.confirmed,
      userId: user._id
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/resendVerificationEmail", async (req, res) => {
  const db = getDb();
  
  // Leemos el refresh token de la cookie
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ loggedIn: false });
  }

  // Buscamos el token en la DB
  const tokenData = await db.collection("refreshTokens").findOne({ token: refreshToken });
  if (!tokenData) {
    return res.status(401).json({ error: 'User not found', emailSent: false });
  }

  //Obtenemos el usuario
  const user = await db.collection("users").findOne(
    { _id: new ObjectId(tokenData.userId) },
    { projection: { email: 1} }
  );

  if(!user){
    return res.status(404).json({ error: 'User not found', emailSent: false });
  }

  if(process.env.ENVIRONMENT === 'DEVELOPMENT'){
    const { verifyEmailToken, createdAt, expiresAt } = generarTokenConfirmacionEmail();

    //Cargamos los datos a la colección account_confirm_tokens
      await db.collection("account_confirm_tokens").insertOne({ 
        userId: user._id,
        confirmationToken: verifyEmailToken,
        createdAt: createdAt,
        expiresAt: expiresAt
      });

    //Enviamos el correo de registro al usuario
    try {
      await enviarCorreoDeRegistro(user.email, verifyEmailToken);
      await db.collection("users").updateOne({ _id: user._id },{ $set: { emailSent: true } });
    } catch (errCorreo) {
      console.error("Falló el envío de correo de registro:", errCorreo);
    }
  }

  //Marcamos el estatus como exitoso
  res.status(201).json({
    emailSent: true
  });

});

export default router;