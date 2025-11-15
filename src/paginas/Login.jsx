import './Login.css'
import loginImage from '../assets/movie-theater.jpg'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import imageLogo from '../assets/movie-database-logo-md.png';

const Login = () => {
    
  /*Estado para controlar el formulario*/
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  /*Actualizar el valor de los estados*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  /*Event listener de FOCUS para el email*/
  const handleMailFocus = (e) => {
    setErrors(prev => ({
      ...prev,
      email: false // true = error
    }));
  };

  /*Event listener de BLUR para el email*/
  const handleMailBlur = (e) => {
    const value = e.target.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrors(prev => ({
      ...prev,
      email: !emailRegex.test(value) // true = error
    }));
  };

  /*Event listener de FOCUS para la contraseña*/
  const handlePasswordFocus = (e) => {
    setErrors(prev => ({
      ...prev,
      password: false // true = error
    }));
  };

  /*Event listener de BLUR para la contraseña*/
  const handlePasswordBlur = (e) => {
    const valueLength = e.target.value.length;
    const isPasswordWrong = !(valueLength >= 8); 
    setErrors(prev => ({
      ...prev,
      password: isPasswordWrong // true = error
    }));
  };

  /*Controlar el envío de datos a Mongo*/
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

    return(
      <div className="loginPage">
        <div className='banner'>
          <div className="wrapperLogo">
            <img src={imageLogo} alt="Logo"/>
          </div>
        </div>
        <div className="loginContainer" style={{
          background: `linear-gradient(rgba(0, 0, 50, 0.5), rgba(0, 0, 50, 0.5)), url('${loginImage}') center/cover no-repeat`,
        }}> 
          <div className="contenedorFormulario">
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
              <div className="contenedorCampo">
                <div className="inputGroup">
                  <input className={errors.email ? "inputError" : ""} type="email" id="email" name="email" minLength="4" maxLength="70" size="10" autoComplete="off" placeholder=" " value={formData.email} onChange={handleChange} onFocus={handleMailFocus} onBlur={handleMailBlur} required/>
                  <label htmlFor="email">Correo electrónico</label>
                </div>
                {errors.email && (
                  <p className='invalidEmail'>
                    <span className="material-symbols-outlined">
                    close
                    </span>
                    Ingrese un correo válido.
                  </p>
                )}
              </div>
              <div className="contenedorCampo">
                <div className={`passwordGroup ${errors.password ? "inputError" : ""}`}>
                  <div className="inputGroup">
                    <input type={showPassword ? 'text' : 'password'} id="password" name="password" minLength="8"  size="10" autoComplete="off" placeholder=" " value={formData.password} onChange={handleChange} onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} required/>
                    <label htmlFor="password">Contraseña</label>
                  </div>
                  <div className="visibilityToggleContainer" tabIndex="0">
                    {showPassword ? 
                    (
                      <span class="material-symbols-outlined" onClick={() => setShowPassword(!showPassword)}>
                      visibility_off
                      </span>
                    ) : (
                      <span className="material-symbols-outlined" onClick={() => setShowPassword(!showPassword)}>
                        visibility
                      </span>
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className='invalidPassword'>
                    <span className="material-symbols-outlined">
                    close
                    </span>
                    Ingrese una contreseña de al menos 8 caracteres.
                  </p>
                )}
              </div>
              <input type="submit" name='submit' value= "Iniciar sesión"/>
              <Link to="/forgot-password" className='recuperarPassword'>Olvidé mi constraseña.</Link>
              <span>¿Aún no tienes una cuenta? <Link to="/registrarse" className='crearCuenta'>Regístrate aquí.</Link></span>
            </form>
          </div>
        </div>
      </div>
    );
}

export default Login;