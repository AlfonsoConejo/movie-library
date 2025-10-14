import './Carrusel.css';
import Item from '../Item/Item.jsx';

export default function Carrusel({titulo,peliculas}){
    return(
        <section className="carruselContenedor">
            <h1>{titulo}</h1>
            <div className='carrusel'>
                 {peliculas.map(pelicula => <Item key={pelicula.id} poster_path={pelicula.poster_path} titulo={pelicula.title} lanzamiento={pelicula.release_date}/>)}
            </div>
        </section>
    );
}