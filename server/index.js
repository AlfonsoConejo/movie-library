import express from "express";
import cors from "cors";
import path from "path";
import crypto from "crypto";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { connectToDatabase, getDb } from "./db.js";
import { enviarCorreoDeRegistro } from "./mailController.js";
import {initCronjobs} from "./initCronjobs.js";
import { createAccessToken, createRefreshToken, sendRefreshTokenToDB } from "./jwtController.js";
import { generarTokenConfirmacionEmail } from "./utils.js";
import { auth } from "./middleware/auth.js";
import { ObjectId } from "mongodb";

//Inicializamos dotenv
import dotenv from "dotenv";
dotenv.config();

//Configuramos bcryp
import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// ------------------ RUTAS DE API ------------------ //

//Tendencias Generales
app.get("/api/trending/all", (req, res) => {
  const time = req.query.time || "day"; // en caso de que no recibamos ninguna variable
  fetch(`https://api.themoviedb.org/3/trending/all/${time}?language=es-MX`, {
     headers: {
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    }
  })
  .then (response => response.json())
  .then (data => res.json(data))
  .catch(err => res.status(500).json({error: err.message}));
});

//Películas en tendencia
app.get("/api/trending/movies", (req, res) => {
  const time = req.query.time || "day"; // en caso de que no recibamos ninguna variable
  fetch(`https://api.themoviedb.org/3/trending/movie/${time}?language=es-MX`, {
     headers: {
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    }
  })
  .then (response => response.json())
  .then (data => res.json(data))
  .catch(err => res.status(500).json({error: err.message}));
});

//Series en tendencia
app.get("/api/trending/tv", (req, res) => {
  const time = req.query.time || "day"; // en caso de que no recibamos ninguna variable
  fetch(`https://api.themoviedb.org/3/trending/tv/${time}?language=es-MX`, {
     headers: {
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    }
  })
  .then (response => response.json())
  .then (data => res.json(data))
  .catch(err => res.status(500).json({error: err.message}));
});

//Personas en tendencia
app.get("/api/trending/people", (req, res) => {
  const time = req.query.time || "day"; // en caso de que no recibamos ninguna variable
  fetch(`https://api.themoviedb.org/3/trending/person/${time}?language=es-MX`, {
     headers: {
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    }
  })
  .then (response => response.json())
  .then (data => res.json(data))
  .catch(err => res.status(500).json({error: err.message}));
});

//Descripción (en español) de Película, Serie o Persona
app.get("/api/contenido", (req, res) => {
  const id = req.query.id;
  const media_type = req.query.media_type;
  fetch(`https://api.themoviedb.org/3/${media_type}/${id}?language=es-MX`, {
     headers: {
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    }
  })
  .then (response => response.json())
  .then (data => res.json(data))
  .catch(err => res.status(500).json({error: err.message}));
});

//Descripción (en inglés )de Película o Serie
app.get("/api/contenidoIngles", (req, res) => {
  const id = req.query.id;
  const media_type = req.query.media_type;
  fetch(`https://api.themoviedb.org/3/${media_type}/${id}?language=es-MX`, {
     headers: {
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    }
  })
  .then (response => response.json())
  .then (data => res.json(data))
  .catch(err => res.status(500).json({error: err.message}));
});

//Fechas de lanzamiento
app.get("/api/movie/fechasLanzamiento", (req, res) => {
  const id = req.query.id;
  fetch(`https://api.themoviedb.org/3/movie/${id}/release_dates`, {
     headers: {
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    }
  })
  .then (response => response.json())
  .then (data => res.json(data))
  .catch(err => res.status(500).json({error: err.message}));
});

//Créditos de la pelícla
app.get("/api/contenido/creditos", (req, res) => {
  const id = req.query.id;
  const media_type = req.query.media_type;
  fetch(`https://api.themoviedb.org/3/${media_type}/${id}/credits?language=es-MX`, {
     headers: {
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    }
  })
  .then (response => response.json())
  .then (data => res.json(data))
  .catch(err => res.status(500).json({error: err.message}));
});

//Clasificación de edad por país
app.get("/api/tv/ratings", (req, res) => {
  const id = req.query.id;
  fetch(`https://api.themoviedb.org/3/tv/${id}/content_ratings`, {
     headers: {
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    }
  })
  .then (response => response.json())
  .then (data => res.json(data))
  .catch(err => res.status(500).json({error: err.message}));
});

//Créditos combinadoas de la persona
app.get("/api/person/creditosCombinados", (req, res) => {
  const id = req.query.id;
  fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?language=es-mx`, {
     headers: {
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    }
  })
  .then (response => response.json())
  .then (data => res.json(data))
  .catch(err => res.status(500).json({error: err.message}));
});

// Búsqueda de información
app.get("/api/buscar", (req, res) => {
  const media_type = req.query.media_type;
  const busqueda = req.query.busqueda;
  const pagina = req.query.pagina || 1;
  fetch(`https://api.themoviedb.org/3/search/${media_type}?query=${busqueda}&include_adult=false&language=es-MX&page=${pagina}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    },
  })
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

// ------------------ RUTAS PARA OPERACIONES EN BASE DE DATOS ------------------ //
app.post("/api/registrar", async (req, res) => {
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
      console.error("Fallo el envío de correo de registro:", errCorreo);
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
app.post("/api/login", async (req, res) => {
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
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // No accesible por JS → súper importante
        secure: true, // En producción cambia a true (HTTPS)
        sameSite: "none", // Evita CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días, la misma fecha de expiración que el refreshToken
      })
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
app.post("/api/refresh-token", async (req, res) => {

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
    res.cookie("refreshToken", newRefresh, {
      httpOnly: true,
      secure: true, // Cambiar a true en producción (HTTPS)
      sameSite: "none", //"strict" en producción y "lax" en local 
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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
app.post("/api/logout", async (req, res) => {
  
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
      secure: true,
      sameSite: "none"
    });

    //Enviamos la respuesta
    return res.json({ success: true, message: "Sesión cerrada."});

  } catch (err) {
    console.log("Error en /api/logout:", err);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
});

// Obtener perfil del usuario con el access token
app.get("/api/me", auth, async (req, res) => {
  try{

    const userId = req.user.sub; // viene del token decodificado
    console.log(userId)
    
    const db = getDb();

    const user = await db.collection("users").findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } } // no mandar password
    );

    console.log(`TOKEN: ${user}`);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// ------------------ SERVIR REACT EN PRODUCCIÓN ------------------ //
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, "../dist");

// Servir archivos estáticos de React
app.use(express.static(clientPath));

// Fallback: cualquier ruta que no empiece con /api
app.use((req, res, next) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(clientPath, "index.html"));
  } else {
    next();
  }
});

// ------------------ INICIAR SERVIDOR ------------------ //
const PORT = process.env.PORT || 5000;

// Conectar a MongoDB y luego iniciar el servidor
connectToDatabase()
  .then(() => {

    //Inicializamos los cronjobs
    initCronjobs();

    app.listen(PORT, () => {
      console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error conectando a MongoDB:", err);
    process.exit(1);
  });