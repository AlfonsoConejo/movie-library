import './movie.css'
import InfoPeliculaTarjeta from '../components/InfoPeliculaTarjeta/InfoPeliculaTarjeta.jsx';
import CarruselReparto from '../components/CarruselReparto/CarruselReparto.jsx';
import InfoPersonaTarjeta from '../components/InfoPersonaTarjeta/InfoPersonaTarjeta.jsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Movie(){
    
    //Creamos nuestros estados
    const [contenidoCargado, setContenidoCargado] = useState(false);
    const [informacion, setInformacion] = useState([]);
    const [informacionIngles, setInformacionIngles] = useState([]);
    const [fechasLanzamiento, setFechasLanzamiento] = useState([]);
    const [tvRatings, setTvRatings] = useState([]);
    const [creditos, setCreditos] = useState([]);


    const { media_type, id } = useParams();

useEffect(() => {
  // Validar que los parámetros existan
  if (!media_type || !id) return;

  const obtenerDatos = async () => {
    try {

      // 1️⃣ Información principal
      const resInfo = await fetch(`/api/contenido?media_type=${media_type}&id=${id}`);
      const data = await resInfo.json();
      setInformacion(data);

      //Si nuestra consulta en inglés no tiene overview
      if(!data.overview){
          const resInfoIngles = await fetch(`/api/contenidoIngles?media_type=${media_type}&id=${id}`);
          const infoIngles = await resInfoIngles.json();
          setInformacionIngles(infoIngles);
      }

      if (media_type === 'movie') {
          // 2️⃣ Fechas de lanzamiento
          const resFechas = await fetch(`/api/movie/fechasLanzamiento?id=${data.id}`);
          const fechas = await resFechas.json();
          setFechasLanzamiento(fechas.results || []);

          
      } 
      if (media_type === 'tv'){
          // 2️⃣ Clasificación de edad por país
          const resRatings = await fetch(`/api/tv/ratings?id=${data.id}`);
          const ratings = await resRatings.json();
          setTvRatings(ratings.results || []);
      }

    if (media_type === 'movie' || media_type === 'tv'){
      // 3️⃣ Créditos
      const resCreditos = await fetch(`/api/contenido/creditos?media_type=${media_type}&id=${id}`);
      const trabajadores = await resCreditos.json();
      setCreditos(trabajadores);
    }

      setContenidoCargado(true);
    } catch (err) {
      console.error("Error general:", err);
    }
  };

  obtenerDatos();
}, [media_type, id]);

if(media_type === 'tv' || media_type === 'movie'){
    return(
        <div className="contenido">
            <InfoPeliculaTarjeta
                key = {informacion.id}
                informacion = {informacion}
                informacionIngles = {informacionIngles}
                fechasLanzamiento = {fechasLanzamiento}
                creditos = {creditos}
                mediaType = {media_type}
                tvRatings = {tvRatings}
                contenidoCargado = {contenidoCargado}
            />
            <CarruselReparto
                reparto = {creditos.cast}
                contenidoCargado = {contenidoCargado}
            />
        </div>
    );
} else if (media_type === 'person'){
    return(
        <div className="contenido">
            <InfoPersonaTarjeta
                informacion = {informacion}
                informacionIngles = {informacionIngles}
            />
        </div>
    );
}
    
}