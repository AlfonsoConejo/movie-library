import './ConfirmarCuenta.css'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailIcon from '../../src/assets/email.png'

const ConfirmarCuenta = () => {

	const navigate = useNavigate();

  //Variables obtenidas a través de la url
  const { token } = useParams();
  
	//Estados
  const [contenidoCargado, setContenidoCargado] = useState(false);
	const [error, setError] = useState(null);
	const [mensaje, setMensaje] = useState(null);
	console.log(contenidoCargado);
  //Hook para llamar a back y revisar la validez del token recibido
  useEffect(() => {
    setContenidoCargado(false);

    const validarToken = async () => {
			try {
				const resToken = await fetch(`/api/verificarCuenta`, {
          method: 'POST',
        	headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({token}),
        });

        let data = {};
				try {
					data = await resToken.json();
				} catch (_) {}

				if (!resToken.ok) {
					setError(data.error || "Error desconocido");
					setContenidoCargado(true);
				}

				//Actualizamos mensaje
				console.log(data);
      	setMensaje(data.mensaje);
				setContenidoCargado(true);
			} catch(error){
				console.error("Error interno del servidor", error);
			}
    };

    validarToken();
    
  },[]);

  return(
    <div className="confirmarCuentaWrapper">
			
				{contenidoCargado ? (
					<div className="mensajeVerificacion">
						<div className="contenedorImagen">
							<img src={emailIcon} />
						</div>
						<h2>{error || mensaje}</h2>
						{mensaje && (
							<button onClick={() =>{navigate("/login")}}>Iniciar Sesión</button>
						)}
					</div>
				) : (
					<div className='divCarga'>
            <span className="loader"></span>
          </div>
				)}
			</div>
    
  );
}

export default ConfirmarCuenta;