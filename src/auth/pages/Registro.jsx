import './auth-form.css'
import HeaderSimple from '../../components/HeaderSimple/HeaderSimple';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SuccessAnimation from '../../components/RegistroExitoso/RegistroExitoso';
import useResizeWindow from '../../customHooks/useResizeWindow';

const Registro = () => {

    //Hook para saber si mostrar interfaz móvil
    const { isMobile } = useResizeWindow(500);

    /*Estado para mostar la contraseña*/
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordGroupFocused, setIsPasswordGroupFocused] = useState(false);

    /*Estado para saber si el formulario es válido*/
    const [isFormValid, setIsFormValid] = useState(false);
    //console.log(isFormValid);
    
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
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState({
        hasMinLength: false,
        hasNumber: false,
        hasUppercase: false
    });

    /*Estado para saber si un campo ya fue tocado*/
    const [touched, setTouched] = useState({
        email: false,
        password: false
    });

    //Expresión regular para validar el campo de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //función para validar la longitud de la contraseña
    const cumpleLongitud = (cadena) => {
        return cadena.length >= 8;
    }

    //Expresión regular para validar si la cadena tiene UpperCase
    const upperCaseRegex = /[A-Z]/;

    //Expresión regular para validar si la cadena contiene números
    const numeroRegex = /[0-9]/;

    /*Actualizar el valor de los estados*/
    const handleChange = (e) => {
        const { name, value } = e.target;

        //Si se modificó el correo
        if(name === 'email'){
            //Guardamos el correo normalizado en una variable
            const correoNormalizado = value.toLowerCase().replace(/\s+/g, '');

            //Actualizamos el estado
            setFormData(prevState => ({
                ...prevState,
                [name]: correoNormalizado
            }));

            //Si el correo es válido
            if(emailRegex.test(correoNormalizado)){
                setIsEmailValid(true);
            }
            //Si el correo es inválido
            else{
                setIsEmailValid(false);
            }
        }

        if(name=== 'password'){
            //Actualizamos el estado
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));

            if (cumpleLongitud(value)){
                setIsPasswordValid(prev => ({
                ...prev,
                hasMinLength: true // Cumple con la longitud
                }));
            } else {
                setIsPasswordValid(prev => ({
                ...prev,
                hasMinLength: false //No cumple con la longitud
                }));
            }

            if (upperCaseRegex.test(value)){
                setIsPasswordValid(prev => ({
                ...prev,
                hasUppercase: true // Cumple con las mayúsculas
                }));
            } else {
                setIsPasswordValid(prev => ({
                ...prev,
                hasUppercase: false //No cumple con las mayúsculas
                }));
            }

            if (numeroRegex.test(value)){
                setIsPasswordValid(prev => ({
                ...prev,
                hasNumber: true // Cumple con los números
                }));
            } else {
                setIsPasswordValid(prev => ({
                ...prev,
                hasNumber: false //No cumple con los números
                }));
            }
        }
    };

    // Este efecto se ejecuta cada vez que cambie "valid"
    useEffect(() => {
        if (isEmailValid && isPasswordValid.hasMinLength && isPasswordValid.hasUppercase && isPasswordValid.hasNumber) {
          setIsFormValid(true);
        } else {
          setIsFormValid(false);
        }
    }, [isEmailValid, isPasswordValid]);

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

    //Estados del formulario
    const [enviado, setEnviado] = useState(false);
    const [error, setError] = useState(false);
    const [enviando, setEnviando] = useState(false);

    //Controlamos el envío de información a mongo
    async function handleSubmit(e) {
        e.preventDefault();
        
        //Si una de las condiciones para enviar el forumulario no se cumple, terminamos la ejecución
        if(!emailRegex.test(formData.email.trim())){
            return;
        }

        if(!cumpleLongitud(formData.password)){
            return;
        }

        if(!upperCaseRegex.test(formData.password)){
            return;
        }
        
        if(!numeroRegex.test(formData.password)){
            return;
        }

        setEnviado(false);
        setError(null);
        setEnviando(true);

        try {
            const res = await fetch('/api/auth/registrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json().catch(() => ({}));
            //console.log(`Este es el estatus: ${data}`);
            if (!res.ok) {
                if (res.status === 400){
                    setError(data.error || 'Faltan campos obligatorios');
                } else if (res.status === 404){
                    setError(data.error || 'Ruta no encontrada');
                } else if (res.status === 500){
                    setError(data.error || 'Error interno del servidor');
                } else {
                    setError(data.error || 'Error al registrarse');
                }
                return;
            }

            setEnviado(true);
        } catch (err){
            console.error(err);
            setError('No se pudo conectar con el servidor');
        } finally{
            setEnviando(false);
        }
    };

    const backgroundStyle = isMobile ? { background: 'none' } : {};

    return(
        <div className="registerPage">
            <HeaderSimple/>
            <div
                className="auth-form-container"
                style={backgroundStyle}
            >
                <div className={`auth-form ${enviado ? 'success' : ''}`}>
                    {!enviado ? (
                        <form onSubmit={handleSubmit} noValidate>
                            <h1>Crea una cuenta</h1>
                            {error && (
                                <div className='backendAlert'>
                                    <span>{error}</span>
                                </div>
                            )
                            }
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
                                        password: false, // ocultar error mientras corrige
                                    }));
                                    }}
                                    onBlur={(e) => {
                                        // Si el foco sigue en algún hijo (input u ojito),
                                        // no disparamos validación todavía.
                                        if (e.currentTarget.contains(e.relatedTarget)) {
                                            return;
                                        }
                                        
                                        const value = formData.password;
                                        console.log("Este es el valor de value:", value)

                                        //Verificamos que la contraseña cumpla con todos los requisitos
                                        const hasMinLength = cumpleLongitud(value);
                                        const hasUppercase = upperCaseRegex.test(value);
                                        const hasNumber = numeroRegex.test(value);
                                        
                                        const isPasswordValid = hasMinLength && hasUppercase && hasNumber;
                                        const isPasswordWrong = !isPasswordValid;

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
                                    <div className='invalidPassword'>
                                    La contraseña de contener al menos:
                                        <ul>
                                            <li className={isPasswordValid.hasMinLength ? 'rule_ok' : ''}>8 caracteres.</li>
                                            <li className={isPasswordValid.hasUppercase ? 'rule_ok' : ''}>1 letra mayúscula.</li>
                                            <li className={isPasswordValid.hasNumber ? 'rule_ok' : ''}>1 número.</li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <button
                            type="submit"
                            name="submit"
                            className={`
                                btn-submit
                                ${!isFormValid ? 'deshabilitado' : ''}
                            `}
                            >
                            {enviando ? (
                                <div className="contenedorPuntos">
                                    <div className="loadingDots" />
                                </div>
                            ) : (
                                'Crear cuenta'
                            )}
                            </button>
                            <span>
                            ¿Ya tienes una cuenta?{" "}
                                <Link to="/login" className='logOrCreate'>
                                    Inicia sesión.
                                </Link>
                            </span>
                        </form>
                    ) : (
                    <SuccessAnimation/>
                    )
                    }
                </div> 
            </div> 
        </div>
    );
}

export default Registro;