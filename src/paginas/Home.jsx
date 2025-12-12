import Carrusel from "../components/Home/Carrusel/Carrusel";
import './Home.css'
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import useTrending from "../customHooks/useTrending";
import VerificationAlert from "../components/VerificationAlert/VerificationAlert";

export default function Home(){
    const { user, cargandoUsuario } = useContext(UserContext);
    const [showEmailAlert, setShowEmailAlert] = useState(false);
    
    useEffect(() => {
        async function isEmailConfirmed() {
            console.log("Decidiendo si mostrar el mensaje");
        try {
            const res = await fetch('/api/auth/isEmailConfirmed', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            });
            const data = await res.json();
            if (data.loggedIn && !data.confirmed) {
            setShowEmailAlert(true);
            }
        } catch (err) {
            console.error(err);
        }
        }

        isEmailConfirmed();
    }, []);
    
    //Estados de los botones de cada carrusel
    const [botonPresionadoGeneral, setBotonPresionadoGeneral] = useState('day');
    const [botonPresionadoPeliculas, setBotonPresionadoPeliculas] = useState('day');
    const [botonPresionadoSeries, setBotonPresionadoSeries] = useState('day');
    const [botonPresionadoPersona, setBotonPresionadoPersona] = useState('day');

    //Llamda a endpoints
    const trendingAllSpanish = useTrending('all', botonPresionadoGeneral, 'es-MX');
    const trendingAllEnglish = useTrending('all', botonPresionadoGeneral, 'en-US');
    
    const trendingMoviesSpanish = useTrending('movies', botonPresionadoPeliculas, 'es-MX');
    const trendingMoviesEnglish = useTrending('movies', botonPresionadoPeliculas, 'en-US');

    const trendingTvSpanish = useTrending('tv', botonPresionadoSeries, 'es-MX');
    const trendingTvEnglish = useTrending('tv', botonPresionadoSeries, 'en-US');

    const trendingPeopleSpanish = useTrending('people', botonPresionadoPersona, 'es-MX');
    const trendingPeopleEnglish = useTrending('people', botonPresionadoPersona, 'en-US');


    //Verificamos si la información aún está cargando
    const isTrendingAllLoading = trendingAllSpanish.isLoading || trendingAllEnglish.isLoading;
    const isTrendingMoviesLoading = trendingMoviesSpanish.isLoading || trendingMoviesEnglish.isLoading;
    const isTrendingTvLoading = trendingTvSpanish.isLoading || trendingTvEnglish.isLoading;
    const isTrendingPeopleLoading = trendingPeopleSpanish.isLoading || trendingPeopleEnglish.isLoading;

    return(
        <div className="paginaInicio">
           {showEmailAlert && <VerificationAlert/>}
            
            <Carrusel
                botones = 'tendencia'
                titulo = 'Lo Más Visto'
                informacionEs={trendingAllSpanish.data?.results || []}
                informacionEn={trendingAllEnglish.data?.results || []}
                isLoading = {isTrendingAllLoading}
                botonPresionado = {botonPresionadoGeneral}
                setBotonPresionado = {setBotonPresionadoGeneral}
            />

            <Carrusel
                botones = 'tendencia'
                titulo = 'Películas Populares'
                informacionEs = {trendingMoviesSpanish.data?.results || []}
                informacionEn = {trendingMoviesEnglish.data?.results || []}
                isLoading = {isTrendingMoviesLoading}
                botonPresionado = {botonPresionadoPeliculas}
                setBotonPresionado = {setBotonPresionadoPeliculas}
            />

            <Carrusel
                botones = 'tendencia'
                titulo = 'Series Populares'
                informacionEs = {trendingTvSpanish.data?.results || []}
                informacionEn = {trendingTvEnglish.data?.results || []}
                isLoading = {isTrendingTvLoading}
                botonPresionado = {botonPresionadoSeries}
                setBotonPresionado = {setBotonPresionadoSeries}
            />

            <Carrusel
                botones = 'tendencia'
                titulo = 'Personas Más Buscadas'
                informacionEs = {trendingPeopleSpanish.data?.results || []}
                informacionEn = {trendingPeopleEnglish.data?.results || []}
                isLoading = {isTrendingPeopleLoading}
                botonPresionado = {botonPresionadoPersona}
                setBotonPresionado = {setBotonPresionadoPersona}
            />
        </div>
    );
}