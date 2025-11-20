import './Registro.css'
import HeaderSimple from '../components/HeaderSimple/HeaderSimple';
import registerImage from '../assets/clapperboard.jpg'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SuccessAnimation from '../components/SuccesAnimation/SuccesAnimation';

const Registro = () => {

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
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        //Si se modificó el correo
        if(name === 'email'){
            const valorSinEspacios = value.trim();
            //Si el correo es válido
            if(emailRegex.test(valorSinEspacios)){
                setIsEmailValid(true);
            }
            //Si el correo es inválido
            else{
                setIsEmailValid(false);
            }
        }

        if(name=== 'password'){
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

    async function handleSubmit(e) {
        e.preventDefault();

        setEnviado(false);
        setError(false);
        setEnviando(true);

        try {
            const res = await fetch('/api/registrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || 'Error al registrarse');
            }

            setEnviado(true);
        } catch {
            setError(true);
        } finally{
            setEnviando(false);
        }
    };

    return(
        
        <div className="registerPage">
            <HeaderSimple/>
            <div
                className="registerContainer"
                style={{
                    background: `linear-gradient(rgba(43, 50, 0, 0.5), rgba(43, 50, 0, 0.5)), url('${registerImage}') center/cover no-repeat`,
                }}
            >
                <div className="contenedorFormulario">
                    {!enviado ? (
                        <form onSubmit={handleSubmit}>
                            <h1>Crea una cuenta</h1>
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
                                        
                                        const value = e.target.value;

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
                                <Link to="/login" className='crearCuenta'>
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