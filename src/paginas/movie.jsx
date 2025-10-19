import './movie.css'
import InfoPeliculaTarjeta from '../components/InfoPeliculaTarjeta/InfoPeliculaTarjeta.jsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Movie(){

    //Creamos nuestros estados
    const [informacion, setInformación] = useState([]);
    const [fechasLanzamiento, setFechasLanzamiento] = useState([]);

    const { media_type, id } = useParams();

    useEffect(() => {
        //Consultamos la información de nuestro elemento
        fetch(`/api/${media_type}?id=${id}`)
            .then(res => res.json())
            .then(data => {
                setInformación(data);

                //Consutamos la API de fechas de lanzamiento
                return fetch(`/api/movie/fechasLanzamiento?id=${data.id}`)
            })
            .then(res => res.json())
            .then(fechas => {
                setFechasLanzamiento(fechas.results);
            })
            .catch(err => console.error(err));
    }, [media_type, id]);

    return(
        <div className="movie">
            <InfoPeliculaTarjeta
                informacion = {informacion}
                fechasLanzamiento = {fechasLanzamiento}
            />
        </div>
    );
}