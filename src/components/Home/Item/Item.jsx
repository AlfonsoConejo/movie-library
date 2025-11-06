import './Item.css';
import { convertirFecha } from '../../../utils.js';
import ImageNotFound from '../../../assets/img_not_found2.jpg'
import { useNavigate } from 'react-router-dom';

export default function Item({id, poster_path, mediaType, titulo, lanzamiento}){
    const navigate = useNavigate(); 
    
    return(
        <div className='contenedorItem' onClick={()=>navigate(`/${mediaType}/${id}`)}>
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : ImageNotFound} alt={titulo} />
            <h1 onClick={()=>navigate(`/${mediaType}/${id}`)}>{titulo}</h1>
            {lanzamiento ? <p>{convertirFecha(lanzamiento)}</p> : undefined}
        </div>
    );
}