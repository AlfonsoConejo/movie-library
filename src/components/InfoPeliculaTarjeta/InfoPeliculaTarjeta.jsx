import './InfoPeliculaTarjeta.css';
import CarruselReparto from '../CarruselReparto/CarruselReparto.jsx';
import SearchNotFound from '../../paginas/SearchNotFound.jsx';
import SkeletonInfoPeliculaTarjeta from '../SkeletonInfoPeliculaTarjeta/SkeletonInfoPeliculaTarjeta.jsx';
import SkeletonActorReparto from '../SkeletonActorReparto/SkeletonActorReparto.jsx';
import {
  convertirMinutosAHoras,
  sliceYear,
  convertirAFechaConDiagonal,
  getLatinOption,
  LATIN_REGEX
} from '../../utils.js';
import ImageNotFound from '../../assets/img_not_found2.jpg';
import useResizeWindow from '../../customHooks/useResizeWindow';

export default function InfoPeliculaTarjeta({
  informacion,
  informacionIngles,
  fechasLanzamiento,
  creditosEs,
  creditosEn,
  tvRatings,
  mediaType,
  isLoading
}) {
  const { isMobile } = useResizeWindow(720);
  //console.log("Información español: ", informacion);
  //console.log("Información inglés: ", informacionIngles);
  if (isLoading) {
    return (
      <>
        <SkeletonInfoPeliculaTarjeta />
        <section className="contenedorCarruselReparto">
          <h2>Reparto</h2>
          <div className="carruselReparto">
            {Array.from({ length: 11 }, (_, i) => (
              <SkeletonActorReparto key={i} />
            ))}
          </div>
        </section>
      </>
    );
  }

  if (!informacion || informacion.success === false) {
    return <SearchNotFound />;
  }

  const reparto = creditosEn?.cast || [];
  const overview = informacion?.overview || informacionIngles?.overview;
  const tagline = informacion?.tagline || informacionIngles?.tagline;

  const obtenerFechaPelicula = () =>
    fechasLanzamiento?.find(f =>
      ['MX', 'US', 'ES'].includes(f.iso_3166_1) &&
      f.release_dates?.[0]?.certification &&
      f.release_dates?.[0]?.release_date
    ) || null;

  const obtenerClasificacionSerie = () =>
    tvRatings?.find(t => ['MX', 'US', 'ES'].includes(t.iso_3166_1)) || null;

  const obtenerEquipoPelicula = () => {
    const roles = ['Director', 'Screenplay', 'Writer', 'Story', 'Characters'];

    //Obtenemos los primeros 3 resultados
    const rolesDesatacados = creditosEn?.crew
      ?.filter(p => roles.includes(p.job))
      .slice(0, 3) || [];
    console.log("Equipo (inglés): ", rolesDesatacados);

    return rolesDesatacados;
  };



  const obtenerEquipoSerie = () =>
    informacionIngles?.created_by?.map(p => ({
      ...p,
      job: 'Creador'
    })).slice(0, 3) || [];

  // ==========================
  // Datos derivados
  // ==========================
  const fechaLocalData =
    mediaType === 'movie' ? obtenerFechaPelicula() : null;

  const clasificacionPelicula =
    fechaLocalData?.release_dates?.[0]?.certification;

  const fechaLocal =
    fechaLocalData?.release_dates?.[0]?.release_date?.slice(0, 10);

  const pais = fechaLocalData?.iso_3166_1;

  const clasificacionSerie =
    mediaType === 'tv' ? obtenerClasificacionSerie() : null;

  const equipoDestacado =
    mediaType === 'movie'
      ? obtenerEquipoPelicula()
      : obtenerEquipoSerie();

    
    //Obtenemos el título en español si está disponible o en inglés
    const titulo =
    mediaType === 'movie'
      ? getLatinOption(informacion.title, informacionIngles?.title)
      : getLatinOption(informacion.name, informacionIngles?.name);

    //Revisamos si el nombre en español tiene caracteres latinos
    const isNameLatin = LATIN_REGEX.test(
        (informacion.title || informacion.name) ?? (informacionIngles.name || informacionIngles.name )
    );
    
    //Seleccionamos la portado en el idioma que tenga caracteres latinos
    const poster_path = isNameLatin 
        ? (informacion.poster_path || informacion.profile_path)
        : (informacionIngles.poster_path || informacionIngles.profile_path);

  const year =
    informacion.release_date
      ? sliceYear(informacion.release_date)
      : informacion.first_air_date
      ? sliceYear(informacion.first_air_date)
      : null;

  const score = informacion.vote_average;
  const scoreColor =
    score >= 7 ? 'green' :
    score >= 4 ? 'orange' :
    score > 0 ? 'red' :
    'gray';


  return (
    <>
      <section
        className="infoPeliculaTarjeta"
        style={{
          backgroundImage:
            !isMobile && informacion.backdrop_path
              ? `url(https://image.tmdb.org/t/p/w780${informacion.backdrop_path})`
              : 'none'
        }}
      >
        <div className="contenedorInformacion">
          <div
            className="contenedorPoster"
            style={{
              backgroundImage:
                isMobile && informacion.backdrop_path
                  ? `url(https://image.tmdb.org/t/p/w780${informacion.backdrop_path})`
                  : 'none'
            }}
          >
            <div className="poster">
              <img
                src={
                  informacion.poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : ImageNotFound
                }
                alt={informacion.title}
              />
            </div>
          </div>

          <div className="informacion">
            <h1 className="titulo">
              {titulo}
              {year && <span className="year"> ({year})</span>}
            </h1>

            {mediaType === 'movie' ? (
              <p className="random">
                {clasificacionPelicula && (
                  <span className="clasificacion">{clasificacionPelicula} </span>
                )}
                {fechaLocal && (
                  <span>
                    {convertirAFechaConDiagonal(fechaLocal)} ({pais}) •{' '}
                  </span>
                )}
                {informacion.genres && (
                  <span>
                    {informacion.genres.map(g => g.name).join(', ')}
                  </span>
                )}
                {informacion.runtime > 0 && (
                  <span> • {convertirMinutosAHoras(informacion.runtime)}</span>
                )}
              </p>
            ) : (
              <p className="random">
                {clasificacionSerie?.rating && (
                  <span className="clasificacion">
                    {clasificacionSerie.rating}{' '}
                  </span>
                )}
                {informacion.genres && (
                  <span>
                    {informacion.genres.map(g => g.name).join(', ')}
                  </span>
                )}
              </p>
            )}

            {score !== undefined && score !== null && (
              <div className="contenedorScore">
                <div className="score" style={{ backgroundColor: scoreColor }}>
                  {score ? Math.floor(score * 10) : 'NR'}
                  {score > 0 && '%'}
                </div>
                <span>Puntuación TMDB</span>
              </div>
            )}

            {tagline && <p className="tagline">{tagline}</p>}

            {overview && (
              <>
                <p className="resumenTitulo">Resumen</p>
                <p className="resumen">{overview}</p>
              </>
            )}

            <div className="contenedorCrew">
              {equipoDestacado.map(persona => (
                <div
                  className="personas-grid"
                  key={persona.credit_id || persona.id}
                >
                  <p className="nombreEmpleado">
                    {persona.name}
                  </p>
                  <p className="puestoEmpleado">{persona.job}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CarruselReparto reparto={reparto || []} />
    </>
  );
}