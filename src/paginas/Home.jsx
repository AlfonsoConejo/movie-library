import Carrusel from "../components/Home/Carrusel/Carrusel";
import { useState, useEffect } from "react";
import useCarousel from "../customHooks/useCarousel";
import './Home.css'

export default function Home(){
    //Usamos el useCarousel para cargar lo más visto del momento
    const [botonPresionadoGeneral, setBotonPresionadoGeneral] = useState('day');

    const { peliculas: general, cargado: cargadoGeneral } = useCarousel(
    () => `/api/trending/all?time=${botonPresionadoGeneral}`,
    [botonPresionadoGeneral]
    );

    //Usamos el useCarousel para cargar las películas más vistas
    const [botonPresionadoPeliculas, setBotonPresionadoPeliculas] = useState('day');

    const { peliculas: peliculas, cargado: cargadoPeliculas } = useCarousel(
    () => `/api/trending/movies?time=${botonPresionadoPeliculas}`,
    [botonPresionadoPeliculas]
    );

    //Usamos el useCarousel para cargar las seriesPopulares
    const [botonPresionadoSeries, setBotonPresionadoSeries] = useState('day');

    const { peliculas: series, cargado: cargadoSeries } = useCarousel(
    () => `/api/trending/tv?time=${botonPresionadoSeries}`,
    [botonPresionadoSeries]
    );


    //Usamos el useCarousel para cargar las personas más buscadas
    const [botonPresionadoPersona, setBotonPresionadoPersona] = useState('day');

    const { peliculas: personas, cargado: cargadoPersonas } = useCarousel(
    () => `/api/trending/people?time=${botonPresionadoPersona}`,
    [botonPresionadoPersona]
    );

    return(
        <div className="paginaInicio">
            <Carrusel
                botones = 'tendencia'
                titulo = 'Lo Más Visto'
                peliculas = {general}
                cargado = {cargadoGeneral}
                botonPresionado = {botonPresionadoGeneral}
                setBotonPresionado = {setBotonPresionadoGeneral}
            />

            <Carrusel
                botones = 'tendencia'
                titulo = 'Películas Populares'
                peliculas = {peliculas}
                cargado = {cargadoPeliculas}
                botonPresionado = {botonPresionadoPeliculas}
                setBotonPresionado = {setBotonPresionadoPeliculas}
            />

            <Carrusel
                botones = 'tendencia'
                titulo = 'Series Populares'
                peliculas = {series}
                cargado = {cargadoSeries}
                botonPresionado = {botonPresionadoSeries}
                setBotonPresionado = {setBotonPresionadoSeries}
            />

            <Carrusel
                botones = 'tendencia'
                titulo = 'Personas Más Buscadas'
                peliculas = {personas}
                cargado = {cargadoPersonas}
                botonPresionado = {botonPresionadoPersona}
                setBotonPresionado = {setBotonPresionadoPersona}
            />
        </div>
 

    );
}