import './Logo.css'
import { useNavigate } from 'react-router-dom';

export default function Logo(){
    const navigate = useNavigate();
    return(
        <div className="contenedorFlexLogo">
            <div className="wrapperLogo">
                 <img src='../../../../brible-logo.png' alt="Logo" onClick={() => navigate('/')} />
            </div>
        </div>
    );
}