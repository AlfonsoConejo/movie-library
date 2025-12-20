import './auth-form.css';
import HeaderSimple from '../../components/HeaderSimple/HeaderSimple';
import { useState, useEffect } from 'react';

const PasswordReset = () => { 

  useEffect(() => {
    document.title = 'Recuperar constraseña - Brible';
  }, []);

  /*Estados de la información de cada campo*/
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  //Estados del formulario
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [enviando, setEnviando] = useState(false);

  //Expresión regular para validar el campo de correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { value } = e.target;
    const valorSinEspacios = value.trim();
    setEmail(value);
    if(emailRegex.test(valorSinEspacios)){
        setEmailValid(true);
      } else{
        setEmailValid(false);
      }
  };

  const handleMailFocus = () => {
    setEmailError(false);
  };

  const handleMailBlur = (e) => {
    const value = e.target.value.trim();

    setEmailTouched(true);
    setEmailError(!emailRegex.test(value));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    //Asignamos valores a los estados del formulario
    setEnviado(false);
    setError(null);
    setEnviando(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/recoverPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email}),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || 'Error interno del servidor');
        setSuccess('');
      } else{
        setSuccess(data.message || 'Si el correo electrónico está registrado, recibirás un mensaje con las instrucciones para recuperar tu contraseña.');
        setError('');
      }
      console.log(success);

      setEnviado(true);
    } catch (err){
      console.error(err);
      setError('No se pudo conectar con el servidor');
    } finally{
      setEnviando(false);
    }

  }

  return (
    <div className="passwordResetPage">
      <HeaderSimple/>
      <div
        className="auth-form-container"
      > 
        <div className="auth-form">
          <h1>Recuperar contraseña</h1>
          {error !== '' && (
              <div className='backendAlert'>
                <span>{error}</span>
              </div>
          )}
          {success !== '' && (
              <div className='backendSuccess'>
                <span>{success}</span>
              </div>
          )}
          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="contenedorCampo">
              <div className="inputGroup">
                <input
                  className={emailError ? "inputError" : ""}
                  type="email"
                  id="email"
                  name="email"
                  minLength="4"
                  maxLength="70"
                  size="10"
                  autoComplete="off"
                  placeholder=" "
                  value={email}
                  onChange={handleChange}
                  onFocus={handleMailFocus}
                  onBlur={handleMailBlur}
                  required
                />
                <label htmlFor="email">Correo electrónico</label>
              </div>
              {emailTouched && emailError && (
                <p className='invalidEmail'>
                  <span className="material-symbols-outlined">
                    close
                  </span>
                  Ingrese un correo válido.
                </p>
              )}
            </div>
            <button
              type="submit"
              name="submit"
              className={`
                btn-submit
                ${!emailValid ? 'deshabilitado' : ''}
              `}
            >
              {enviando ? (
                <div className="contenedorPuntos">
                  <div className="loadingDots" />
                </div>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;