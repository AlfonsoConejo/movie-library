import './Login.css'
import loginImage from '../assets/movie-theater.jpg'
import { Link } from 'react-router-dom';

const Login = () => {
    const backgroundStyle = {
    color: 'blue',
    backgroundColor: 'lightgray',
    fontSize: '16px',
    padding: '10px'
  };
    return(
        <div className="loginContainer" style={{
          background: `linear-gradient(rgba(0, 0, 50, 0.5), rgba(0, 0, 50, 0.5)), url('${loginImage}') center/cover no-repeat`,
        }}> 
          <div className="contenedorFormulario">
            <h1>Iniciar sesión</h1>
            <form action="">
              <div className="inputGroup">
                <input type="email" id="email" name="email" minLength="4" maxLength="70" size="10" autoComplete="off" placeholder=" " required/>
                <label htmlFor="">Correo electrónico</label>
              </div>
              <div className="passwordGroup">
                <div className="inputGroup">
                  <input type="password" id="password" name="password" minLength="4" maxLength="50" size="10" autoComplete="off" placeholder=" " required/>
                  <label htmlFor="">Contraseña</label>
                </div>
                <div className="visibilityToggleContainer">
                  <span className="material-symbols-outlined">
                    visibility
                  </span>
                </div>
              </div>
              <input type="submit" name='submit' value= "Iniciar sesión"/>
              <Link className='recuperarPassword'>Olvidé mi constraseña.</Link>
              <span>¿Aún no tienes una cuenta? <Link className='crearCuenta'>Regístrate aquí.</Link></span>
            </form>
          </div>
        </div>
    );
}

export default Login;