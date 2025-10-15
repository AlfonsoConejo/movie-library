import './Carrusel.css';
import Item from '../Item/Item.jsx';
import SkeletonItem from '../SkeletonItem/SkeletonItem.jsx';
import BotonesTendencia from '../BotonesTendencia/BotonesTendencia.jsx';

export default function Carrusel({titulo, peliculas, cargado, botonPresionado, setBotonPresionado, setCargado}){
    return(
        <section className="carruselContenedor">
            <div className='encabezadoCarrusel'>
                <h1>{titulo}</h1>
                <BotonesTendencia
                    botonPresionado = {botonPresionado}
                    setBotonPresionado = {setBotonPresionado}
                    setCargado = {setCargado}
                />
                
            </div>
            {cargado ? 
                <div className='carrusel'>
                    {peliculas.map(pelicula => 
                        <Item 
                            key={pelicula.id} 
                            poster_path={pelicula.poster_path} 
                            titulo={pelicula.title} 
                            lanzamiento={pelicula.release_date}
                        />
                    )}
                </div> 
            
            : <div className='carrusel'>
                {Array(11).fill().map((_,i)=><SkeletonItem key={i}/>)}
            </div>
            }
            
        </section>
    );
}