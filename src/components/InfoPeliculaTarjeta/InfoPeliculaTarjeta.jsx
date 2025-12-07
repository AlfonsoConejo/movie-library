import './InfoPeliculaTarjeta.css'
import CarruselReparto from '../CarruselReparto/CarruselReparto.jsx';
import SearchNotFound from '../../paginas/SearchNotFound.jsx';
import SkeletonInfoPeliculaTarjeta from '../SkeletonInfoPeliculaTarjeta/SkeletonInfoPeliculaTarjeta.jsx'
import SkeletonActorReparto from '../SkeletonActorReparto/SkeletonActorReparto.jsx';
import { convertirMinutosAHoras, sliceYear, convertirAFechaConDiagonal, getLatinOption } from '../../utils.js'
import ImageNotFound from '../../assets/img_not_found2.jpg';
import useResizeWindow from '../../customHooks/useResizeWindow';

export default function InfoPeliculaTarjeta({informacion, informacionIngles, fechasLanzamiento, creditos, tvRatings, mediaType, reparto, isLoading}){
    
    //Hook para saber si mostrar interfaz móvil
    const { isMobile } = useResizeWindow(720);
    
     if (isLoading) {
        return(
            <>
            <SkeletonInfoPeliculaTarjeta />
            <section className='contenedorCarruselReparto'>
                <h2>Reparto</h2>
                <div className='carruselReparto'>
                    {Array(11).fill().map((_,i)=><SkeletonActorReparto key={i}/>)}
                </div>
            </section> 
            </>
        );;
    }

    if (!informacion || informacion.success === false) {
        return <SearchNotFound/>;
    }


    //Obtenemos el overview y el tagline en español o en inglés
    const overview = informacion?.overview || informacionIngles?.overview || null;
    const tagline = informacion?.tagline || informacionIngles?.tagline || null;
    //Obtenemos los datos del estreno en español
    let fechaLanzamientoLocal;
    let clasificacionSerie;
    let equipoDestacado = [];
    let nombreFinal = null;

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

        //Obtenemos el título que se mostrará en pantalla con caracteres latinos
        nombreFinal = getLatinOption(informacion?.title, informacionIngles.title);
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
        }

        //Obtenemos el título que se mostrará en pantalla con caracteres latinos
        nombreFinal = getLatinOption(informacion.name, informacionIngles.name);

    };

    const clasificacionPelicula = fechaLanzamientoLocal?.release_dates?.[0].certification;
    const fechaLocal = fechaLanzamientoLocal?.release_dates?.[0]?.release_date.slice(0,10);

    const pais = fechaLanzamientoLocal?.iso_3166_1;

    return(
        <>
            <section
                className="infoPeliculaTarjeta"
                style={{
                    backgroundImage: !isMobile
                    ? `url(https://image.tmdb.org/t/p/w780${informacion.backdrop_path})`
                    : "none"
                }}
            >
                <div className="contenedorInformacion">
                    <div className="contenedorPoster" style={{backgroundImage: (isMobile && informacion.backdrop_path ) ? `url(https://image.tmdb.org/t/p/w780${informacion.backdrop_path})` : "none"}}>
                        <div className="poster">
                            <img src={informacion.poster_path ? `https://image.tmdb.org/t/p/w500${informacion.poster_path}` : ImageNotFound} alt={informacion.title} />
                        </div>
                    </div>
                    
                    <div className="informacion">
                        <h1 className='titulo'>{nombreFinal} 
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
                                {informacion.genres && <span>{informacion.genres.map(i => i.name).join(', ')}</span> }
                                {(informacion.runtime > "0") && <span> • {convertirMinutosAHoras(informacion.runtime)}</span>}
                            </p>
                            :
                            <p className='random'>
                                {clasificacionSerie?.rating && <span className='clasificacion'>{clasificacionSerie.rating} </span>}
                                {informacion.genres && <span>{informacion.genres.map(i => i.name).join(', ')}</span> }
                            </p>
                        }

                        {informacion.vote_average !== undefined && informacion.vote_average !== null && (
                            <div className='contenedorScore'>
                                <div className='score' 
                                    style={{
                                        backgroundColor: 
                                        informacion.vote_average >= 7 ? 'green' :
                                        informacion.vote_average >= 4 ? 'orange' :
                                        informacion.vote_average > 0 ? 'red' :
                                        'gray'
                                    }}
                                    >
                                    {informacion.vote_average ? (Math.floor(informacion.vote_average * 10)) : 'NR'}
                                    {informacion.vote_average > 0 ? '%': ''} 
                                </div>
                                <span>Puntuación TMDB</span>
                            </div>)
                        }
                        {tagline && <p className='tagline'>{tagline}</p>}
                        {overview && 
                            <p className='resumenTitulo'>Resumen</p>
                        }
                        {overview && 
                            <p className='resumen'>{overview}</p>
                        }
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
            <CarruselReparto
                reparto = {reparto || []}
            />
        </>
        );


}