import './InfoPersonaTarjeta.css';
import ImageNotFound from '../../assets/img_not_found2.jpg';
import CarruselFilmografia from '../CarruselFilmografia/CarruselFilmografia.jsx';
import TimelineFilmografia from '../TimelineFilmografia/TimelineFilmografia.jsx';
import SearchNotFound from '../../paginas/SearchNotFound.jsx';
import { convertirAFechaCompleta, traduccionesOcupacion } from '../../utils.js';
import { useEffect, useState } from 'react';

const InfoPersonaTarjeta = ({informacion, informacionIngles, isLoading}) => {
    
    //Estado para controlar el texto de la biografía
    const [expanded, setExpanded] = useState(false);

    useEffect(()=>{
            document.title = informacion?.name ? `${informacion.name} - Brible ` : 'Brible';
    },[informacion?.name]); 

    if (isLoading) {
       return(
            <div className='divCarga'>
                <span className="loader"></span>
            </div>
        );
    }

    if (!informacion || informacion.success === false) {
        return <SearchNotFound/>
    }

    //Caracteres máximos permitidos en la biografía
    const max = 350;
    
    let biografia = informacion.biography 
    || informacionIngles?.biography 
    || "";
    
    
    const isLong = biografia.length > max;
    biografia = expanded ? biografia : biografia.slice(0, max);

    const sexo =
        informacion?.gender === 2 ? 'Masculino' :
        informacion?.gender === 1 ? 'Femenino' :
        'No especificado';

    return(
        <div className="contenedorInfoPersona">
            <div className="columnaIzq">
                <div className="contenedorImagenPersona">
                    <img
                    src={informacion.profile_path 
                            ? `https://image.tmdb.org/t/p/w780${informacion.profile_path}` 
                            : ImageNotFound}
                    alt={informacion.name}
                    />
                </div>
                <div className="DatosPersonales">
                    <h2 className="subtitulo">Información Personal</h2>
                    {informacion.name && <h2 className="nombrePersona">{informacion.name}</h2>}                    

                    {informacion.homepage &&
                        <div className="sitioOficial">
                            <p className='negritas_sitio_oficial'>Sitio Oficial </p>
                            <a href={informacion.homepage} target="_blank" rel="noopener noreferrer">
                                <span className="material-symbols-outlined">link</span>
                            </a>  
                        </div>
                    }

                    {informacion.known_for_department && (<p className='negritas'>Ocupación</p>)}
                    {informacion.known_for_department && (<p className='dato'>{traduccionesOcupacion[informacion.known_for_department]}</p>)}

                    {informacion.place_of_birth && (<p className='negritas'>Lugar de nacimiento</p>)}
                    {informacion.place_of_birth && (<p className='dato'>{informacion.place_of_birth}</p>)}

                    {informacion.gender !== 0 && (<p className='negritas'>Sexo</p >)}
                    {informacion.gender !== 0  && (<p className='dato'>{sexo}</p>)}

                    {informacion.birthday && (<p className='negritas'>Nacimiento</p>)}
                    {informacion.birthday && (<p className='dato'>{convertirAFechaCompleta(informacion.birthday)}</p>)}

                    {informacion.deathday && (<p className='negritas'>Muerte</p>)}
                    {informacion.deathday && (<p className='dato'>{convertirAFechaCompleta(informacion.deathday)}</p>)}
                </div>
            </div>
            <div className="columnaDer">
                {informacion.name && <h1>{informacion.name}</h1>}

                {biografia  && <h2 className='biografiaTitulo'>Biografía</h2>}
                {biografia  && <p>
                    {biografia}
                    {!expanded && isLong && "…"}
                        {isLong && (
                        <button className='expandText'
                            onClick={() => setExpanded(!expanded)} 
                        >
                        {expanded ? "Mostrar menos" : "Mostrar más"}
                        </button>
                    )}
                </p>}
                        
                <CarruselFilmografia/>

                <TimelineFilmografia/>
            </div>
        </div>
    ); 
}

export default InfoPersonaTarjeta;