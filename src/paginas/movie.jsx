import './movie.css'
import InfoPeliculaTarjeta from '../components/InfoPeliculaTarjeta/InfoPeliculaTarjeta.jsx';
import CarruselReparto from '../components/CarruselReparto/CarruselReparto.jsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Movie(){
    
    //Creamos nuestros estados
    const [informacion, setInformacion] = useState([]);
    const [fechasLanzamiento, setFechasLanzamiento] = useState([]);
    const [creditos, setCreditos] = useState([]);


    const { media_type, id } = useParams();
    console.log(media_type, id);

useEffect(() => {
  // Validar que los parámetros existan
  if (!media_type || !id) return;

  const obtenerDatos = async () => {
    try {

      // 1️⃣ Información principal
      const resInfo = await fetch(`/api/${media_type}?id=${id}`);
      const data = await resInfo.json();
      setInformacion(data);

      // 2️⃣ Fechas de lanzamiento
      const resFechas = await fetch(`/api/movie/fechasLanzamiento?id=${data.id}`);
      const fechas = await resFechas.json();
      setFechasLanzamiento(fechas.results || []);

      // 3️⃣ Créditos
      const resCreditos = await fetch(`/api/movie/creditos?id=${data.id}`);
      const trabajadores = await resCreditos.json();
      setCreditos(trabajadores);

    } catch (err) {
      console.error("Error general:", err);
    }
  };

  obtenerDatos();
}, [media_type, id]);

    return(
        <div className="movie">
            <InfoPeliculaTarjeta
                key = {informacion.id}
                informacion = {informacion}
                fechasLanzamiento = {fechasLanzamiento}
                creditos = {creditos}
            />
            <CarruselReparto
                reparto = {creditos.cast}
            />
        </div>
    );
}