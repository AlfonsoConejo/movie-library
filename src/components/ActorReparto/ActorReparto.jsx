import './ActorReparto.css'
import ImageNotFound from '../../assets/img_not_found.jpg'

export default function ActorReparto({id, nombre, personaje, rutaImagen}) {

    const fondo = rutaImagen
    ? `url(https://image.tmdb.org/t/p/w500${rutaImagen})` : `url(${ImageNotFound})`;



    return(
        <div className="infoActor">
            <div className="contenedorImagen" style ={{backgroundImage: fondo}}>
            </div>
            <div className="datosActor">
                {nombre && <p className='nombreActor'>{nombre}</p>}
                {personaje && <p className='nombrePersonaje'>{personaje}</p>}
            </div>
        </div>
    );
}