import { useQuery } from "@tanstack/react-query";
import {
    fetchTendenciaTodo,
    fetchTendenciaPeliculas,
    fetchTendenciaSeries,
    fetchTendenciaPersonas,
} from '../apiConnections/tmdb.js';

export default function useTrending(type, time, language) {
  const fetcher = {
    all: fetchTendenciaTodo,
    movies: fetchTendenciaPeliculas,
    tv: fetchTendenciaSeries,
    people: fetchTendenciaPersonas
  }[type];

  return useQuery({
    queryKey: ['trending', type, time, language],
    queryFn: () => fetcher(time, language),
    enabled: !!time,
    staleTime: 20 * 60 * 1000 // 20 minutos
  });
}