import { Profiler } from 'react';
import './InfoPersonaTarjeta.css';
import ImageNotFound from '../../assets/img_not_found.jpg';
import { convertirAFechaCompleta, traduccionesOcupacion } from '../../utils.js';

const InfoPersonaTarjeta = ({informacion, informacionIngles}) => {
    let sexo, biografia;
    biografia = informacion.biography || informacionIngles.biography || null;
    {informacion?.gender == 2 ? sexo = 'Masculino' : sexo = 'Femenino' }

    if(informacion){
        return(
            <div className="contenedorInfoPersona">
                <div className="columnaIzq">
                    <div className="contenedorImagenPersona">
                        <img className='' src={`https://image.tmdb.org/t/p/w780${informacion.profile_path}` || ImageNotFound} alt={informacion.name} />
                    </div>
                    <div className="DatosPersonales">
                        <h2>Información Personal</h2>

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

                    {(informacion.biography || informacionIngles) && <h2>Biografía</h2>}
                    {(informacion.biography || informacionIngles) && <p>{biografia}</p>}
                </div>
            </div>
        ); 
    } else{
    }   
}

export default InfoPersonaTarjeta;