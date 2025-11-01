import './ItemSmall.css';
import ImageNotFound from '../../assets/img_not_found2.jpg';
import { useNavigate } from 'react-router-dom';

const ItemSmall = ({posterPath, titulo, mediaType, id}) => {
    const navigate = useNavigate(); 
    return(
        <div className='contenedorItemSmall' onClick={()=>navigate(`/${mediaType}/${id}`)}>
            <div className="contenedorPoster">
                <img src={posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : ImageNotFound} alt={titulo} loading="lazy" />
            </div>
            <p>{titulo}</p>
        </div>
    );
}

export default ItemSmall;