import './ContenidoEncontrado.css';
import ImageNotFound from '../../../assets/img_not_found2.jpg';
import { sliceYear, traduccionesOcupacion } from '../../../utils';
import { useNavigate } from 'react-router-dom';

const ContenidoEncontrado = ({id, mediaType, imagePath, titulo, release_date, resumen, name, departamento}) => {
    const navigate = useNavigate();

    let deptoTraducido;
    if(departamento){
        deptoTraducido = traduccionesOcupacion[departamento] || departamento;
    }

    if (mediaType === 'movie' || mediaType === 'tv'){
        return(
            <div className="contenidoEncontrado">
                <div className="contenedorPoster">
                    <img src={imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : ImageNotFound} alt={titulo} onClick={()=>navigate(`/${mediaType}/${id}`)}/>
                </div>
                <div className="contenedorInformacion">
                    <h3 className="titulo" onClick={()=>navigate(`/${mediaType}/${id}`)}> {titulo ? titulo : ''} <span>{release_date ? `(${sliceYear(release_date)})` : ''}</span></h3>
                    <div className="resumen">{resumen ? resumen : ''}</div>
                </div>
            </div>
        );
    } else if (mediaType === 'person'){
        return(
            <div className="contenidoEncontrado">
                <div className="contenedorFoto">
                    <img src={imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : ImageNotFound} alt={name} onClick={()=>navigate(`/${mediaType}/${id}`)}/>
                </div>
                <div className="contenedorInformacionActor">
                    <h3 onClick={()=>navigate(`/${mediaType}/${id}`)}>{name}</h3>
                    <p>{deptoTraducido}</p>
                </div>
            </div>
        );
    }
}

export default ContenidoEncontrado;