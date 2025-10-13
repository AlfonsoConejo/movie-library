import './Carrusel.css';
import Item from '../Item/Item.jsx';

export default function Carrusel({peliculas}){
    return(
        <div className="carrusel">
            {peliculas.map(pelicula => <Item key={pelicula.id} poster_path={pelicula.backdrop_path} titulo={pelicula.title} lanzamiento={pelicula.release_date}/>)}
        </div>
    );
}