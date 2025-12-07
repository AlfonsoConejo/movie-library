import './Carrusel.css';
import Item from '../Item/Item.jsx';
import SkeletonItem from '../SkeletonItem/SkeletonItem.jsx';
import BotonesTendencia from '../BotonesTendencia/BotonesTendencia.jsx';
import { getLatinOption, LATIN_REGEX } from '../../../utils.js';

export default function Carrusel({titulo, informacionEs, informacionEn, isLoading, botonPresionado, setBotonPresionado}){

    if (isLoading){
        return(
            <section className="carruselContenedor">
                <div className='encabezadoCarrusel'>
                    <h1>{titulo}</h1>
                    <BotonesTendencia
                        botonPresionado = {botonPresionado}
                        setBotonPresionado = {setBotonPresionado}
                    />
                </div>
                <div className='carrusel static'>
                    {Array(11).fill().map((_,i)=><SkeletonItem key={i}/>)}
                </div>
            </section>
        );
    }

    return(
        <section className="carruselContenedor">
            <div className='encabezadoCarrusel'>
                <h1>{titulo}</h1>
                <BotonesTendencia
                    botonPresionado = {botonPresionado}
                    setBotonPresionado = {setBotonPresionado}
                />
                
            </div>
            <div className='carrusel'>
                {informacionEs.map((peliculaEs) => {

                    const peliculaEn = informacionEn.find(
                    p => p.id === peliculaEs.id
                    ) || {};

                    const titulo = getLatinOption(
                    peliculaEs.title || peliculaEs.name,
                    peliculaEn.title || peliculaEn.name
                    );

                    const isNameLatin = LATIN_REGEX.test(
                    peliculaEs.title ?? peliculaEs.name
                    );

                    const poster_path = isNameLatin 
                    ? (peliculaEs.poster_path || peliculaEs.profile_path)
                    : (peliculaEn.poster_path || peliculaEn.profile_path);

                    const fecha = peliculaEs.release_date || peliculaEs.first_air_date;

                    return (
                    <Item 
                        key={peliculaEs.id} 
                        id={peliculaEs.id} 
                        mediaType={peliculaEs.media_type}
                        poster_path={poster_path} 
                        titulo={titulo} 
                        lanzamiento={fecha}
                    />
                    );
                })}
            </div>
            
        </section>
    );
}