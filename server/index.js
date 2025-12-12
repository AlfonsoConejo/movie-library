import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { connectToDatabase, getDb } from "./db.js";
import {initCronjobs} from "./initCronjobs.js";
import tmdbRoutes from "./routes/tmdb.routes.js";
import authRoutes from "./routes/auth.routes.js";
import actionRoutes from "./routes/actions.routes.js";

//Inicializamos dotenv
import dotenv from "dotenv";
dotenv.config();

const app = express();

// --------------------------- MIDDLEWARE ------------------------- //
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// ---------------------------- ROUTERS --------------------------- //
app.use("/api/tmdb", tmdbRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/action", actionRoutes);

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

// ----------------------- INICIAR SERVIDOR ----------------------- //
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