import './Carrusel.css';
import Item from '../Item/Item.jsx';
import SkeletonItem from '../SkeletonItem/SkeletonItem.jsx';

export default function Carrusel({titulo, peliculas, cargado}){
    return(
        <section className="carruselContenedor">
            <h1>{titulo}</h1>
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
                {Array(8).fill().map((_,i)=><SkeletonItem key={i}/>)}
            </div>
            }
            
        </section>
    );
}