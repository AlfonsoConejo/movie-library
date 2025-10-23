import './InfoPeliculaTarjeta.css'
import SkeletonInfoPeliculaTarjeta from '../SkeletonInfoPeliculaTarjeta/SkeletonInfoPeliculaTarjeta.jsx'
import { convertirMinutosAHoras, sliceYear, convertirAFechaConDiagonal } from '../../utils.js'

export default function InfoPeliculaTarjeta({informacion, fechasLanzamiento, creditos, tvRatings, mediaType, contenidoCargado}){
    console.log(`Este es el estado de la carga: ${contenidoCargado}`);
    if(contenidoCargado && informacion && mediaType && creditos){
        //Obtenemos los datos del estreno en español
        let fechaLanzamientoLocal;
        let clasificacionSerie = null;
        let equipoDestacado = [];
        //Si es película
        if(mediaType === 'movie'){
            //Obtenemos la fecha de estreno en México, Estados Unidos o España
            fechaLanzamientoLocal = 
            fechasLanzamiento?.find(f => f.iso_3166_1 == 'MX' && f.release_dates[0].certification && f.release_dates[0].release_date) ||
            fechasLanzamiento?.find(f => f.iso_3166_1 == 'US' && f.release_dates[0].certification && f.release_dates[0].release_date) ||
            fechasLanzamiento?.find(f => f.iso_3166_1 == 'ES' && f.release_dates[0].certification && f.release_dates[0].release_date) ||
            null;

            //Obtenemos un arreglo de 3 posiciones con las personas más importantes
            const rolesImportantes = ["Director", "Screenplay", "Writer", "Story", "Characters"]; 
            if (creditos?.crew?.length) {
                equipoDestacado = creditos.crew
                    .filter(persona => rolesImportantes.includes(persona.job))
                    .slice(0, 3);
            }
        } 
        //Si es serie
        else if (mediaType === 'tv'){
            //Obtenemos la clasificaciones de México, Estados Unidos o España
            clasificacionSerie = 
            tvRatings?.find(t => t.iso_3166_1 == 'MX') ||
            tvRatings?.find(t => t.iso_3166_1 == 'US') ||
            tvRatings?.find(t => t.iso_3166_1 == 'ES') ||
            null

            //Obtenemos un arreglo de 3 posiciones con los creadores de la serie 
            if (informacion?.created_by?.length) {
                equipoDestacado = informacion.created_by.map(persona => ({
                    id: persona.id,
                    credit_id: persona.credit_id,
                    name: persona.name,
                    gender: persona.gender,
                    profile_path: persona.profile_path,
                    job: "Creador"
                }))
                .slice(0, 3);
                console.log(equipoDestacado);
            }

        };

        const clasificacionPelicula = fechaLanzamientoLocal?.release_dates?.[0].certification;
        const fechaLocal = fechaLanzamientoLocal?.release_dates?.[0]?.release_date.slice(0,10);

        const pais = fechaLanzamientoLocal?.iso_3166_1;

        return(
        
            <section className="infoPeliculaTarjeta" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w780${informacion.backdrop_path})`}}>
                <div className="contenedorInformacion">
                    <div className="poster">
                        <img src={`https://image.tmdb.org/t/p/w500${informacion.poster_path}`} alt={informacion.title} />
                    </div>
                    <div className="informacion">
                        <h1 className='titulo'>{informacion.title || informacion.name} 
                            {
                            <span className="year">
                                {informacion.release_date
                                ? ` (${sliceYear(informacion.release_date)})`
                                : informacion.first_air_date
                                ? ` (${sliceYear(informacion.first_air_date)})`
                                : ""}
                            </span>
                            }
                        </h1>
                        {mediaType === 'movie' ?
                            <p className='random'>
                                {clasificacionPelicula && <span className='clasificacion'>{clasificacionPelicula} </span>}
                                {fechaLanzamientoLocal && <span>{convertirAFechaConDiagonal(fechaLocal)} ({pais}) • </span>}
                                {informacion.genres && <span>{informacion.genres.map(i => i.name).join(', ')} • </span> }
                                {informacion.runtime && <span>{convertirMinutosAHoras(informacion.runtime)}</span>}
                            </p>
                            :
                            <p className='random'>
                                {clasificacionSerie.rating && <span className='clasificacion'>{clasificacionSerie.rating} </span>}
                                {informacion.genres && <span>{informacion.genres.map(i => i.name).join(', ')}</span> }
                            </p>
                        }
                        

                        {informacion.vote_average && 
                            <div className='contenedorScore'>
                                <div className='score' 
                                    style={{
                                        backgroundColor: 
                                        informacion.vote_average >= 7 ? 'green' :
                                        informacion.vote_average >= 4 ? 'orange' :
                                        informacion.vote_average >= 0 ? 'red' :
                                        'gray'
                                    }}
                                    >
                                    {informacion.vote_average ? (Math.floor(informacion.vote_average * 10)) : 'NR'}% 
                                </div>
                                Puntuación TMDB
                            </div>
                        }
                        {informacion.tagline && <p className='tagline'>{informacion.tagline}</p>}
                        <p className='resumenTitulo'>Resumen</p>
                        <p className='resumen'>{informacion.overview}</p>
                        <div className="contenedorCrew">
                            {equipoDestacado && 
                                equipoDestacado.map( (persona, index) => {
                                    return <div className='personas-grid' key={index}>
                                        <p className='nombreEmpleado'>{persona.original_name || persona.name}</p>
                                        <p className='puestoEmpleado'>{persona.job}</p>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        );
    } else {
        return <SkeletonInfoPeliculaTarjeta/>
    }

}