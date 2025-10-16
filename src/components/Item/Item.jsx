import './Item.css';
import convertirFecha from '../../utils.js';
import ImageNotFound from '../../assets/img_not_found.jpg'

export default function Item({poster_path, titulo, lanzamiento}){
    return(
        <div className='contenedorItem'>
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : ImageNotFound} alt={titulo} />
            <h1>{titulo}</h1>
            {lanzamiento ? <p>{convertirFecha(lanzamiento)}</p> : undefined}
            
        </div>
    );
}