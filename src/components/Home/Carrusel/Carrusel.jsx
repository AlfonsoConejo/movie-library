import './Carrusel.css';
import Item from '../Item/Item.jsx';
import SkeletonItem from '../SkeletonItem/SkeletonItem.jsx';
import BotonesTendencia from '../BotonesTendencia/BotonesTendencia.jsx';

export default function Carrusel({titulo, informacionEs, isLoading, botonPresionado, setBotonPresionado}){

    if (isLoading){
        return(
            <div className='carrusel'>
                {Array(11).fill().map((_,i)=><SkeletonItem key={i}/>)}
            </div>
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
                {informacionEs.map(pelicula => 
                    <Item 
                        key={pelicula.id} 
                        id={pelicula.id} 
                        mediaType = {pelicula.media_type}
                        poster_path={pelicula.poster_path || pelicula.profile_path} 
                        titulo={pelicula.title ||pelicula.name} 
                        lanzamiento={pelicula.release_date || pelicula.first_air_date}
                    />
                )}
            </div> 
            
        </section>
    );
}