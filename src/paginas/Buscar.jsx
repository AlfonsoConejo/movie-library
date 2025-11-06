import './Buscar.css';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PeliculaEncontrada from '../components/ResultadoBusqueda/PeliculaEncontrada/PeliculaEncontrada';

const Buscar = () => {
    const [searchParams] = useSearchParams();
    const busqueda = searchParams.get('busqueda');

    // Estados principales
    const [contenidoCargado, setContenidoCargado] = useState(false);
    const [resultadoBusquedaPeliculas, setResultadoBusquedaPeliculas] = useState([]);
    const [resultadoBusquedaSeries, setResultadoBusquedaSeries] = useState([]);
    const [resultadoBusquedaPersona, setResultadoBusquedaPersona] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [filtroActivo, setFiltroActivo] = useState(null);

    // UseEffect para obtener los totales y primera página de resultados
    useEffect(() => {
        window.scrollTo(0, 0);
        setPagina(1);
        if (!busqueda) return;

        const consultarBusquedaInicial = async () => {
            setContenidoCargado(false);

            try {
                const urls = [
                    `/api/buscar?busqueda=${encodeURIComponent(busqueda)}&media_type=movie&pagina=1`,
                    `/api/buscar?busqueda=${encodeURIComponent(busqueda)}&media_type=tv&pagina=1`,
                    `/api/buscar?busqueda=${encodeURIComponent(busqueda)}&media_type=person&pagina=1`,
                ];

                const [resMovie, resTV, resPerson] = await Promise.all(urls.map(url => fetch(url)));
                const [dataMovie, dataTV, dataPerson] = await Promise.all([
                    resMovie.json(),
                    resTV.json(),
                    resPerson.json(),
                ]);

                setResultadoBusquedaPeliculas(dataMovie);
                setResultadoBusquedaSeries(dataTV);
                setResultadoBusquedaPersona(dataPerson);

                // Determinar primer tipo con resultados
                if (dataMovie.total_results > 0) setFiltroActivo('peliculas');
                else if (dataTV.total_results > 0) setFiltroActivo('series');
                else if (dataPerson.total_results > 0) setFiltroActivo('personas');
                else setFiltroActivo(null);
            } catch (err) {
                console.error('Error general:', err);
            } finally {
                setContenidoCargado(true);
            }
        };

        consultarBusquedaInicial();
    }, [busqueda]);

    // 🧩 2️⃣ useEffect — carga de página/filtro activo
    useEffect(() => {
        if (!busqueda || !filtroActivo) return;

        const consultarPagina = async () => {
            //setContenidoCargado(false);

            try {
                const tipo =
                    filtroActivo === 'peliculas'
                        ? 'movie'
                        : filtroActivo === 'series'
                        ? 'tv'
                        : 'person';

                console.log(`Este es el valor actual de page: ${pagina}`);
                const url = `/api/buscar?busqueda=${encodeURIComponent(busqueda)}&media_type=${tipo}&pagina=${pagina}`;
                const res = await fetch(url);
                const data = await res.json();

                console.log(data);
                if (filtroActivo === 'peliculas') setResultadoBusquedaPeliculas(data);
                if (filtroActivo === 'series') setResultadoBusquedaSeries(data);
                if (filtroActivo === 'personas') setResultadoBusquedaPersona(data);
            } catch (err) {
                console.error('Error general:', err);
            } finally {
                //setContenidoCargado(true);
            }
        };

        consultarPagina();
    }, [pagina, filtroActivo, busqueda]);

    // 🔁 Renderizado condicional
    if (!contenidoCargado) {
        return (
            <div className="divCarga">
                <span className="loader"></span>
            </div>
        );
    }

    let totalPaginas = 1;
    if (filtroActivo === 'peliculas') totalPaginas = resultadoBusquedaPeliculas.total_pages;
    else if (filtroActivo === 'series') totalPaginas = resultadoBusquedaSeries.total_pages;
    else if (filtroActivo === 'personas') totalPaginas = resultadoBusquedaPersona.total_pages;
    
    return (
        <div className="contenedorBuscar">
            <div className="mensajeBusqueda">
                Mostrando resultados de "<span>{busqueda}</span>"
            </div>

            <div className="wrapperConsulta">
                {/* Columna izquierda (filtros) */}
                <div className="columnaFiltro">
                    <div className="filtro">
                        <h3>Resultados de la búsqueda</h3>
                        <ul>
                            <li
                                className={filtroActivo === 'peliculas' ? 'activo' : ''}
                                onClick={() => {
                                    setFiltroActivo('peliculas');
                                    setPagina(1);
                                }}
                            >
                                Películas <span>{resultadoBusquedaPeliculas.total_results}</span>
                            </li>

                            <li
                                className={filtroActivo === 'series' ? 'activo' : ''}
                                onClick={() => {
                                    setFiltroActivo('series');
                                    setPagina(1);
                                }}
                            >
                                Series <span>{resultadoBusquedaSeries.total_results}</span>
                            </li>

                            <li
                                className={filtroActivo === 'personas' ? 'activo' : ''}
                                onClick={() => {
                                    setFiltroActivo('personas');
                                    setPagina(1);
                                }}
                            >
                                Personas <span>{resultadoBusquedaPersona.total_results}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Columna derecha (resultados dinámicos) */}
                <div className="columnaResultados">

                            
                    <div className="contenedorResultados">
                        {filtroActivo === 'peliculas' &&
                            resultadoBusquedaPeliculas?.results?.map((p) => (
                                <PeliculaEncontrada 
                                key = { p.id }
                                id = {p.id}
                                mediaType = 'movie'
                                posterPath = {p.poster_path}
                                titulo = { p.title }
                                release_date = {p.release_date}
                                resumen = {p.overview}
                                />

                            ))}

                        {filtroActivo === 'series' &&
                            resultadoBusquedaSeries?.results?.map((s) => (
                                <PeliculaEncontrada 
                                key = { s.id }
                                id = {s.id}
                                mediaType = 'tv'
                                posterPath = {s.poster_path}
                                titulo = { s.name }
                                release_date = {s.first_air_date}
                                resumen = {s.overview}
                                />
                            ))}

                        {filtroActivo === 'personas' &&
                            resultadoBusquedaPersona?.results?.map((per) => (
                                <div key={per.id}>{per.name}</div>
                            ))}
                    </div>

                    {/* Ejemplo de paginación (simple) */}
                    <div className="paginacion">
                        <button disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>
                            Anterior
                        </button>
                        <span>Página {pagina}</span>
                        <button disabled={pagina >= totalPaginas} onClick={() => setPagina(pagina + 1)}>Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Buscar;