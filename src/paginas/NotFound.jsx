import './NotFound.css'
import bribleIsotipo from '../assets/brible-isotipo.png'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();
  return (
    <div className="error404-container">
      {/* Contenido */}
      <div className="contenedorLogoMensaje">
				<div className="logo">
					{/* Icono */}
					<img src={bribleIsotipo}/>
				</div>
				<div className="notfound_mensaje">

					{/* Texto */}
					<h1 className="">404</h1>
					<p className="">Página no encontrada</p>

					{/* Botón */}
					<button  onClick={() => {navigate('/')}}>
						Volver al Inicio
					</button>
				</div>
      </div>
    </div>
    )
}

export default NotFound;