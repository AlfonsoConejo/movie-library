import './Logo.css'
import logo from '../../../assets/movie-database-logo-md.png';
import { useNavigate } from 'react-router-dom';

export default function Logo(){
    const navigate = useNavigate();
    return(
        <div className="contenedorFlexLogo">
            <div className="wrapperLogo">
                 <img src={logo} alt="Logo" onClick={() => navigate('/')} />
            </div>
        </div>
    );
}