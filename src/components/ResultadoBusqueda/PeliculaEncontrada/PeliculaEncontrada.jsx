import './PeliculaEncontrada.css';
import ImageNotFound from '../../../assets/img_not_found2.jpg';
import { sliceYear } from '../../../utils';
import { useNavigate } from 'react-router-dom';

const PeliculaEncontrada = ({id, mediaType, posterPath, titulo, release_date, resumen}) => {
    const navigate = useNavigate();

    return(
        <div className="peliculaEcontrada">
            <div className="contenedorPoster">
                <img src={posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : ImageNotFound} alt={titulo} onClick={()=>navigate(`/${mediaType}/${id}`)}/>
            </div>
            <div className="contenedorInformacion">
                <h3 className="titulo" onClick={()=>navigate(`/${mediaType}/${id}`)}> {titulo ? titulo : ''} <span>({sliceYear(release_date)})</span></h3>
                <div className="resumen">{resumen ? resumen : ''}</div>
            </div>
        </div>
    );
}

export default PeliculaEncontrada;