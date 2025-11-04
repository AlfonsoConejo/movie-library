import './Buscar.css'
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Buscar = () => {

    const [searchParams] = useSearchParams();
    const busqueda = searchParams.get('busqueda');

    //Creamos nuestros estados
    const [contenidoCargado, setContenidoCargado] = useState(false);
    const [resultadoBusqueda, setResultadoBusqueda] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Validar que los parámetros existan
        if (!busqueda) return;
        setContenidoCargado(false);

        const consultarBusqueda = async () => {
            try{
                // Ruta en servidor para consultar el endpoint de búsqueda
                const resBusqueda = await fetch(`/api/buscar/buscarMulti?busqueda=${encodeURIComponent(busqueda)}`);
                const data = await resBusqueda.json();
                setResultadoBusqueda(data);
                console.log(data);
                setContenidoCargado(true);
            } catch (err) {
                console.error("Error general:", err);
            }
        }
        consultarBusqueda();
    },[busqueda]);

    return(
        <div className="contenedorBuscar">

        </div>
    );
}

export default Buscar;