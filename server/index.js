import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ------------------ RUTAS DE API ------------------ //
app.get("/api/movies/trending", (req, res) => {
  const time = req.query.time || "day"; // en caso de que no recibamos ninguna variable
  console.log(`Esta es el periodo que esta consultando: ${time}`);
  fetch(`https://api.themoviedb.org/3/trending/movie/${time}?language=es-MX`, {
     headers: {
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    }
  })
  .then (response => response.json())
  .then (data => res.json(data))
  .catch(err => res.status(500).json({error: err.message}));
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
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});