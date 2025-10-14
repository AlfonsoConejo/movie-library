import './Item.css';
import convertirFecha from '../../utils.js';

export default function Item({poster_path, titulo, lanzamiento}){
    return(
        <div className='contenedorItem'>
            <img src={`https://image.tmdb.org/t/p/w500/${poster_path}}`} alt={titulo} />
            <h1>{titulo}</h1>
            <p>{convertirFecha(lanzamiento)}</p>
        </div>
    );
}