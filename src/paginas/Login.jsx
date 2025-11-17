import './Login.css'
import loginImage from '../assets/movie-theater.jpg'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HeaderSimple from '../components/HeaderSimple/HeaderSimple';

const Login = () => {
    
  /*Estado para mostar la contraseña*/
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordGroupFocused, setIsPasswordGroupFocused] = useState(false);

  /*Estado para saber si el formulario es válido*/
  const [isFormValid, setIsFormValid] = useState(false);

  /*Estados de la información de cada campo*/
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  /*Estados para marcar alertas a los campos*/
  const [errors, setErrors] = useState({
    email: false,
    password: false
  });

  /*Estados para saber si un campo tiene un valor válido*/
  const [valid, setvalid] = useState({
    email: false,
    password: false
  });

  /*Estado para saber si un campo ya fue tocado*/
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  //Expresión regular para validar el campo de correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /*Actualizar el valor de los estados*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    //Si se modificó el correo
    if(name === 'email'){
      const valorSinEspacios = value.trim();
      //Si el correo es válido
      if(emailRegex.test(valorSinEspacios)){
        setvalid(prev => ({
          ...prev,
          email: true // El correo es válido
        }));
      }
      //Si el correo es inválido
      else{
        setvalid(prev => ({
          ...prev,
          email: false // El correo es inválido
        }));
      }
    }

    if(name=== 'password'){
      if (value.length >= 8){
        setvalid(prev => ({
          ...prev,
          password: true // La contraseña es válida
        }));
        console.log('la contraseña tiene 8 caracteres o más');
      } else {
        setvalid(prev => ({
          ...prev,
          password: false //La contraseña es inválida
        }));
      }
    }
  };

  // Este efecto se ejecuta cada vez que cambie "valid"
  useEffect(() => {
    if (valid.email && valid.password) {
      setIsFormValid(true);
      console.log('El formulario es válido');
    } else {
      setIsFormValid(false);
      console.log('El formulario no es válido');
    }
  }, [valid]);

  /*Event listener de FOCUS para el email*/
  const handleMailFocus = () => {
    setErrors(prev => ({
      ...prev,
      email: false // true = error
    }));
  };

  /*Event listener de BLUR para el email*/
  const handleMailBlur = (e) => {
    const value = e.target.value.trim();

    setTouched(prev => ({
      ...prev,
      email: true,
    }));

    setErrors(prev => ({
      ...prev,
      email: !emailRegex.test(value) // true = error
    }));
  };

  /*Controlar el envío de datos a Mongo*/
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return(
    <div className="loginPage">
      <HeaderSimple/>
      <div
        className="loginContainer"
        style={{
          background: `linear-gradient(rgba(0, 0, 50, 0.5), rgba(0, 0, 50, 0.5)), url('${loginImage}') center/cover no-repeat`,
        }}
      > 
        <div className="contenedorFormulario">
          <h1>Iniciar sesión</h1>
          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="contenedorCampo">
              <div className="inputGroup">
                <input
                  className={errors.email ? "inputError" : ""}
                  type="email"
                  id="email"
                  name="email"
                  minLength="4"
                  maxLength="70"
                  size="10"
                  autoComplete="off"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleMailFocus}
                  onBlur={handleMailBlur}
                  required
                />
                <label htmlFor="email">Correo electrónico</label>
              </div>
              {touched.email && errors.email && (
                <p className='invalidEmail'>
                  <span className="material-symbols-outlined">
                    close
                  </span>
                  Ingrese un correo válido.
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="contenedorCampo">
              <div
                className={`passwordGroup ${errors.password ? "inputError" : ""}`}
                onFocus={() => {
                  setIsPasswordGroupFocused(true);
                  setErrors(prev => ({
                    ...prev,
                    password: false, // ocultar error mientras corrige (opcional)
                  }));
                }}
                onBlur={(e) => {
                  // Si el foco sigue en algún hijo (input u ojito),
                  // no disparamos validación todavía.
                  if (e.currentTarget.contains(e.relatedTarget)) {
                    return;
                  }

                  const valueLength = formData.password.length;
                  const isPasswordWrong = !(valueLength >= 8);

                  setTouched(prev => ({
                    ...prev,
                    password: true,
                  }));

                  setErrors(prev => ({
                    ...prev,
                    password: isPasswordWrong,
                  }));

                  setIsPasswordGroupFocused(false);
                }}
              >
                <div className="inputGroup">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    minLength="8"
                    size="10"
                    autoComplete="off"
                    placeholder=" "
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="password">Contraseña</label>
                </div>
                <div className="visibilityToggleContainer" tabIndex="0">
                  {showPassword ? (
                    <span
                      className="material-symbols-outlined"
                      onClick={() => setShowPassword(false)}
                    >
                      visibility_off
                    </span>
                  ) : (
                    <span
                      className="material-symbols-outlined"
                      onClick={() => setShowPassword(true)}
                    >
                      visibility
                    </span>
                  )}
                </div>
              </div>

              {touched.password && errors.password && !isPasswordGroupFocused && (
                <p className='invalidPassword'>
                  <span className="material-symbols-outlined">
                    close
                  </span>
                  Ingrese una contreseña de al menos 8 caracteres.
                </p>
              )}
            </div>

            <input className={isFormValid ? '' : 'deshabilitado'} type="submit" name='submit' value="Iniciar sesión" disabled={!isFormValid}/>
            
            <Link to="/forgot-password" className='recuperarPassword'>
              Olvidé mi constraseña.
            </Link>
            <span>
              ¿Aún no tienes una cuenta?{" "}
              <Link to="/registro" className='crearCuenta'>
                Regístrate aquí.
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;