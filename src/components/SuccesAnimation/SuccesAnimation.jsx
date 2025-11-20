// src/components/SuccessAnimation.jsx
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import successAnimation from '../../../public/Success.json'

export default function SuccessAnimation() {
  return (
    <div style={{ width: 140, height: 140 }}>
      <DotLottieReact
        src='../../../public/Success.json'
        loopCount='1'
        autoplay
      />
    </div>
  );
}