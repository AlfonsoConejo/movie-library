import express from "express";
const router = express.Router();

//Tendencias Generales
router.get("/trending/all", (req, res) => {
  const language = req.query.language || "es-MX"; 
  const time = req.query.time || "day"; 
  fetch(`https://api.themoviedb.org/3/trending/all/${time}?language=${language}`, {
     headers: {
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    }
  })
  .then (response => response.json())
  .then (data => res.json(data))
  .catch(err => res.status(500).json({error: err.message}));
});

//Películas en tendencia
router.get("/trending/movies", (req, res) => {
  const language = req.query.language || "es-MX";
  const time = req.query.time || "day"; // en caso de que no recibamos ninguna variable
  fetch(`https://api.themoviedb.org/3/trending/movie/${time}?language=${language}`, {
     headers: {
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    }
  })
  .then (response => response.json())
  .then (data => res.json(data))
  .catch(err => res.status(500).json({error: err.message}));
});

//Series en tendencia
router.get("/trending/tv", (req, res) => {
  const language = req.query.language || "es-MX";
  const time = req.query.time || "day"; // en caso de que no recibamos ninguna variable
  fetch(`https://api.themoviedb.org/3/trending/tv/${time}?language=${language}`, {
     headers: {
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    }
  })
  .then (response => response.json())
  .then (data => res.json(data))
  .catch(err => res.status(500).json({error: err.message}));
});

//Personas en tendencia
router.get("/trending/people", (req, res) => {
  const language = req.query.language || "es-MX";
  const time = req.query.time || "day"; // en caso de que no recibamos ninguna variable
  fetch(`https://api.themoviedb.org/3/trending/person/${time}?language=${language}`, {
     headers: {
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    }
  })
  .then (response => response.json())
  .then (data => res.json(data))
  .catch(err => res.status(500).json({error: err.message}));
});

//Descripción de Película, Serie o Persona
router.get("/contenido", (req, res) => {
  const id = req.query.id;
  const media_type = req.query.media_type;
  const language = req.query.language || "es-MX"; 
  fetch(`https://api.themoviedb.org/3/${media_type}/${id}?language=${language}`, {
     headers: {
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    }
  })
  .then (response => response.json())
  .then (data => res.json(data))
  .catch(err => res.status(500).json({error: err.message}));
});

//Fechas de lanzamiento
router.get("/movie/fechasLanzamiento", (req, res) => {
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

//Créditos de la película
router.get("/contenido/creditos", (req, res) => {
  const id = req.query.id;
  const media_type = req.query.media_type;
  const language = req.query.language || "es-MX"; 
  fetch(`https://api.themoviedb.org/3/${media_type}/${id}/credits?language=${language}`, {
     headers: {
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    }
  })
  .then (response => response.json())
  .then (data => res.json(data))
  .catch(err => res.status(500).json({error: err.message}));
});

//Clasificación de edad por país
router.get("/tv/ratings", (req, res) => {
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
router.get("/person/creditosCombinados", (req, res) => {
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
router.get("/buscar", (req, res) => {
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

export default router;