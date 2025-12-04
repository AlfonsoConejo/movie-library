//tmdb.js
export async function fetchContenido({ media_type, id, language }) {
  const res = await fetch(`/api/tmdb/contenido?media_type=${media_type}&id=${id}&language=${language}`);
  if (!res.ok) throw new Error('Error al obtener contenido');
  return res.json();
}

export async function fetchFechasLanzamiento(movieId) {
  const res = await fetch(`/api/tmdb/movie/fechasLanzamiento?id=${movieId}`);
  if (!res.ok) throw new Error('Error fechas');
  const json = await res.json();
  return json.results || [];
}

export async function fetchTvRatings(tvId) {
  const res = await fetch(`/api/tmdb/tv/ratings?id=${tvId}`);
  if (!res.ok) throw new Error('Error ratings');
  const json = await res.json();
  return json.results || [];
}

export async function fetchCreditos(media_type, id) {
  const res = await fetch(`/api/tmdb/contenido/creditos?media_type=${media_type}&id=${id}`);
  if (!res.ok) throw new Error('Error creditos');
  return res.json();
}

export async function fetchCreditosCombinados(personId) {
  const res = await fetch(`/api/tmdb/person/creditosCombinados?id=${personId}`);
  if (!res.ok) throw new Error('Error creditos combinados');
  return res.json();
}