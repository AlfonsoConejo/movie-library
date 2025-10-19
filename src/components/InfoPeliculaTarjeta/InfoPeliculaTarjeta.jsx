import './infoPeliculaTarjeta.css'
import { convertirMinutosAHoras, sliceYear } from '../../utils.js'

export default function InfoPeliculaTarjeta({informacion, fechasLanzamiento}){
    //Obtenemos los datos del estreno en español
    const fechaLanzamientoLocal = 
        fechasLanzamiento?.find(f => f.iso_3166_1 == 'MX' && f.release_dates[0].certification && f.release_dates[0].release_date) ||
        fechasLanzamiento?.find(f => f.iso_3166_1 == 'US' && f.release_dates[0].certification && f.release_dates[0].release_date) ||
        fechasLanzamiento?.find(f => f.iso_3166_1 == 'ES' && f.release_dates[0].certification && f.release_dates[0].release_date) ||
        null;

    console.log(fechaLanzamientoLocal);
    const fechaLocal = fechaLanzamientoLocal?.release_dates?.[0]?.release_date.slice(0,10);
    const clasificacionLocal = fechaLanzamientoLocal?.release_dates?.[0]?.certification;

    return(
        <section className="infoPeliculaTarjeta" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w780${informacion.backdrop_path})`}}>
            <div className="contenedorInformacion">
                <div className="poster">
                    <img src={`https://image.tmdb.org/t/p/w500${informacion.poster_path}`} alt={informacion.title} />
                </div>
                <div className="informacion">
                    <h1>{informacion.title} 
                        {informacion.release_date && 
                        <span className='year'>{` (${sliceYear(informacion.release_date)})`}</span>}
                    </h1>
                    <p className='random'>
                        {clasificacionLocal && <span>{clasificacionLocal} · </span>}
                        {fechaLocal && <span>{fechaLocal} · </span>}
                        {informacion.genres && <span>{informacion.genres.map(i => i.name).join(', ')} · </span> }
                        {informacion.runtime && <span>{convertirMinutosAHoras(informacion.runtime)}</span>}
                    </p>

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
                    <p>{informacion.overview}</p>
                </div>
            </div>
        </section>
    );
}