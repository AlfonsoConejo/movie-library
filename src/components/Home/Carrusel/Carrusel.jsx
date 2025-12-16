import './Carrusel.css';
import { useEffect, useRef} from 'react';
import Item from '../Item/Item.jsx';
import SkeletonItem from '../SkeletonItem/SkeletonItem.jsx';
import BotonesTendencia from '../BotonesTendencia/BotonesTendencia.jsx';
import { getLatinOption, LATIN_REGEX } from '../../../utils.js';

export default function Carrusel({titulo, informacionEs, informacionEn, isLoading, botonPresionado, setBotonPresionado}){

    const refCarrusel = useRef(null);
    const refSkeletonCarrusel = useRef(null);

    useEffect(() => {
        if (refCarrusel.current) {
            refCarrusel.current.scrollLeft = 0;
        }
        if (refSkeletonCarrusel.current) {
            refSkeletonCarrusel.current.scrollLeft = 0;
        }
    }, [botonPresionado]);

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
                <div className='carruselStatic' ref={refSkeletonCarrusel}>
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
            <div className='carrusel' ref={refCarrusel}>
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