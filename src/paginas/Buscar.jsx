import './Buscar.css'
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Buscar = () => {

    const [searchParams] = useSearchParams();
    const busqueda = searchParams.get('busqueda');

    //Creamos nuestros estados
    const [contenidoCargado, setContenidoCargado] = useState(false);
    const [resultadoBusqueda, setResultadoBusqueda] = useState([]);
    const [resultadoBusquedaPeliculas, setResultadoBusquedaPeliculas] = useState([]);
    const [resultadoBusquedaSeries, setResultadoBusquedaSeries] = useState([]);
    const [resultadoBusquedaPersona, setResultadoBusquedaPersona] = useState([]);
    const [pagina, setPagina] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!busqueda) return;
        setContenidoCargado(false);

        const consultarBusqueda = async () => {
            try {
                const urls = [
                    `/api/buscar?busqueda=${encodeURIComponent(busqueda)}&media_type=multi&pagina=${pagina}`,
                    `/api/buscar?busqueda=${encodeURIComponent(busqueda)}&media_type=movie&pagina=${pagina}`,
                    `/api/buscar?busqueda=${encodeURIComponent(busqueda)}&media_type=tv&pagina=${pagina}`,
                    `/api/buscar?busqueda=${encodeURIComponent(busqueda)}&media_type=person&pagina=${pagina}`,
                ];

                const [resMulti, resMovie, resTV, resPerson] = await Promise.all(
                    urls.map(url => fetch(url))
                );

                const [dataMulti, dataMovie, dataTV, dataPerson] = await Promise.all([
                    resMulti.json(),
                    resMovie.json(),
                    resTV.json(),
                    resPerson.json(),
                ]);

                setResultadoBusqueda(dataMulti);
                setResultadoBusquedaPeliculas(dataMovie);
                setResultadoBusquedaSeries(dataTV);
                setResultadoBusquedaPersona(dataPerson);

                console.log({ dataMulti, dataMovie, dataTV, dataPerson });
            } catch (err) {
                console.error("Error general:", err);
            } finally {
                setContenidoCargado(true);
            }
        };

        consultarBusqueda();
    }, [busqueda, pagina]);

    // Determinar el primer grupo con resultados
        let primerTipoConResultados = null;
        if (resultadoBusquedaPeliculas?.total_results > 0) {
        primerTipoConResultados = "peliculas";
        } else if (resultadoBusquedaSeries?.total_results > 0) {
        primerTipoConResultados = "series";
        } else if (resultadoBusquedaPersona?.total_results > 0) {
        primerTipoConResultados = "personas";
        }

    console.log(primerTipoConResultados);

    const [filtroActivo, setFiltroActivo] = useState(primerTipoConResultados);

    useEffect(() => {
    setFiltroActivo(primerTipoConResultados);
    }, [primerTipoConResultados]);

    return(
        contenidoCargado ? 
            <div className="contenedorBuscar">
                <div className="mensajeBusqueda">Mostrando resultados de "<span>{busqueda}</span>"</div>
                <div className="wrapperConsulta">
                    <div className='columnaFiltro'>
                        <h3>Resultados de la búsqueda</h3>
                        <ul>
                            <li className={filtroActivo  === 'peliculas' ?  'activo': ''} onClick={() => setFiltroActivo('peliculas')}>Películas <span>{resultadoBusquedaPeliculas.total_results}</span></li>
                            <li className={filtroActivo  === 'series' ?  'activo': ''} onClick={() => setFiltroActivo('series')}>Series <span>{resultadoBusquedaSeries.total_results}</span></li>
                            <li className={filtroActivo  === 'personas' ?  'activo': ''} onClick={() => setFiltroActivo('personas')}>Personas <span>{resultadoBusquedaPersona.total_results}</span></li>
                        </ul>
                        <div className='columnaResultados'></div>
                    </div>
                    <div className="contenedorFiltroBusqueda">
                    </div>
                </div>
            </div>
            :
            <div className='divCarga'>
                <span className="loader"></span>
            </div>
    );
}

export default Buscar;