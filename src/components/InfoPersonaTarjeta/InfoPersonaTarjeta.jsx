import './InfoPersonaTarjeta.css';
import CarruselFilmografia from '../CarruselFilmografia/CarruselFilmografia.jsx';
import TimelineFilmografia from '../TimelineFilmografia/TimelineFilmografia.jsx';
import ImageNotFound from '../../assets/img_not_found.jpg';
import { convertirAFechaCompleta, traduccionesOcupacion } from '../../utils.js';

const InfoPersonaTarjeta = ({informacion, informacionIngles}) => {
    const biografia = informacion.biography || informacionIngles?.biography || null;
    const sexo = informacion?.gender === 2 ? 'Masculino' : 'Femenino';

    if(informacion){
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

                        {informacion.gender && (<p className='negritas'>Sexo</p >)}
                        {informacion.gender && (<p className='dato'>{sexo}</p>)}

                        {informacion.birthday && (<p className='negritas'>Nacimiento</p>)}
                        {informacion.birthday && (<p className='dato'>{convertirAFechaCompleta(informacion.birthday)}</p>)}

                        {informacion.deathday && (<p className='negritas'>Muerte</p>)}
                        {informacion.deathday && (<p className='dato'>{convertirAFechaCompleta(informacion.deathday)}</p>)}
                    </div>
                </div>
                <div className="columnaDer">
                    {informacion.name && <h1>{informacion.name}</h1>}

                    {(informacion?.biography != "" || informacionIngles.biography != "") && <h2>Biografía</h2>}
                    {(informacion?.biography != ""|| informacionIngles.biography  != "") && <p>{biografia}</p>}

                    <CarruselFilmografia/>
                    <TimelineFilmografia/>
                </div>
            </div>
        ); 
    } else{
    }   
}

export default InfoPersonaTarjeta;