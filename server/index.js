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