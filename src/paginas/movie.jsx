import './movie.css'
import InfoPeliculaTarjeta from '../components/InfoPeliculaTarjeta/InfoPeliculaTarjeta.jsx';
import CarruselReparto from '../components/CarruselReparto/CarruselReparto.jsx';
import InfoPersonaTarjeta from '../components/InfoPersonaTarjeta/InfoPersonaTarjeta.jsx';
import { useParams } from 'react-router-dom';
import { createContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    fetchContenido,
    fetchFechasLanzamiento,
    fetchTvRatings,
    fetchCreditos,
    fetchCreditosCombinados
} from '../apiConnections/tmdb.js'

//Contexto para pasar los créditos combinados
export const creditosCombinadosContexto = createContext();

export default function Movie(){
    const { media_type, id } = useParams();

    //Búsqueda de información en español
    const infoQuery = useQuery({
        queryKey: ['contenido', media_type, id, 'es-MX'],
        queryFn: () => fetchContenido({ media_type, id, language: 'es-MX' }),
        enabled: !!media_type && !!id, // solo cuando params válidos
        // opcional: staleTime override por query
        staleTime: 5 * 60 * 1000,
    });

    //Búsqueda de información en inglés
    const infoEnQuery = useQuery({
        queryKey: ['contenido', media_type, id, 'en-US'],
        queryFn: () => fetchContenido({ media_type, id, language: 'en-US' }),
        enabled: !!media_type && !!id,
        staleTime: 5 * 60 * 1000,
    });

    //Fechas de lanzamiento
    const fechasQuery = useQuery({
        queryKey: ['fechasLanzamiento', id],
        queryFn: () => fetchFechasLanzamiento(id),
        enabled: media_type === 'movie' && !!infoQuery.data,
        // no queremos que esto bloquee la UI principal; lo dejamos false hasta que haya info
    });

    //TV ratings (solo para tv)
    const tvRatingsQuery = useQuery({
        queryKey: ['tvRatings', id],
        queryFn: () => fetchTvRatings(id),
        enabled: media_type === 'tv' && !!infoQuery.data,
    });

    //Créditos
    const creditosQuery = useQuery({
        queryKey: ['creditos', media_type, id],
        queryFn: () => fetchCreditos(media_type, id),
        enabled: (media_type === 'movie' || media_type === 'tv') && !!infoQuery.data,
    });

    // Créditos combinados (person)
    const creditosCombinadosQuery = useQuery({
        queryKey: ['creditosCombinados', id],
        queryFn: () => fetchCreditosCombinados(id),
        enabled: media_type === 'person' && !!infoQuery.data,
    });

    //Guardamos los datos obtenidos
    const informacionSpanish = infoQuery.data ?? null;
    const informacionIngles = infoEnQuery.data ?? null;
    const fechasLanzamiento = fechasQuery.data ?? [];
    const tvRatings = tvRatingsQuery.data ?? [];
    console.log("tvRatings: ", tvRatings);
    const creditos = creditosQuery.data ?? { cast: [], crew: [] };
    console.log("creditos: ", creditosQuery.data);
    const creditosCombinados = creditosCombinadosQuery?.data ?? null;

    // Manejo de loading: consideramos isLoading si la query principal está cargando.
    const isLoading = infoQuery.isLoading;
    const isError = infoQuery.isError;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [media_type, id]);

    const loadingMovie = (
        isLoading ||
        infoEnQuery.isLoading ||
        fechasQuery.isLoading ||
        creditosQuery.isLoading
    );

    const loadingTv = (
        isLoading ||
        infoEnQuery.isLoading ||
        tvRatingsQuery.isLoading ||
        creditosQuery.isLoading
    );

    const loadingPerson = (
        isLoading ||
        infoEnQuery.isLoading ||
        creditosCombinadosQuery.isLoading
    );

    if (isError) {
        return <div className="contenido">Error al cargar la información</div>;
    }

    if(media_type === 'tv' || media_type === 'movie'){
        return(
            <div className="contenido">
                <InfoPeliculaTarjeta
                    informacion = {informacionSpanish}
                    informacionIngles = {informacionIngles}
                    fechasLanzamiento = {fechasLanzamiento}
                    creditos = {creditos}
                    mediaType = {media_type}
                    tvRatings = {tvRatings}
                    isLoading={media_type === 'movie' ? loadingMovie : loadingTv}
                />
                <CarruselReparto
                    reparto = {creditos?.cast || []}
                    isLoading={media_type === 'movie' ? loadingMovie : loadingTv}
                />
            </div>
        );

    } else if (media_type === 'person'){
        return(
            <div className="contenido">
                <creditosCombinadosContexto.Provider value={{creditosCombinados}}>
                    <InfoPersonaTarjeta
                        informacion = {informacionSpanish}
                        informacionIngles = {informacionIngles}
                        isLoading={loadingPerson}
                    />
                </creditosCombinadosContexto.Provider>
            </div>
        );
    }
}