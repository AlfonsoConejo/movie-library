// src/components/SuccessAnimation.jsx
import './RegistroExitoso.css'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function RegistroExitoso() {
  return (
    <div className='registroExitoso'>
      <div className='animationContainer'>
        <DotLottieReact
        //Los archivos de la carpeta Public son servidos desde la raíz
          src='../../../Success.json'
          loopCount='1'
          autoplay
        />
      </div>
      <h2>¡Registro exitoso!</h2>
      <p>Revisa tu correo electrónico para verificar tu cuenta.</p>
    </div>
  );
}