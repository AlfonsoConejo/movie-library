import './ActorReparto.css'
import ImageNotFound from '../../assets/img_not_found2.jpg'
import { useNavigate } from 'react-router-dom';

export default function ActorReparto({id, nombre, personaje, rutaImagen}) {
    const navigate = useNavigate(); 

    const fondo = rutaImagen
    ? `url(https://image.tmdb.org/t/p/w500${rutaImagen})` : `url(${ImageNotFound})`;

    return(
        <div className="infoActor" onClick={()=>navigate(`/person/${id}`)}>
            <div className="contenedorImagen" style ={{backgroundImage: fondo}}>
            </div>
            <div className="datosActor">
                {nombre && <p className='nombreActor'>{nombre}</p>}
                {personaje && <p className='nombrePersonaje'>{personaje}</p>}
            </div>
        </div>
    );
}