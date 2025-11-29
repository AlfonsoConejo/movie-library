import './HeaderSimple.css'
import imageLogo from '../../../public/brible-logo.png';
import { useNavigate } from 'react-router-dom';
import Logo from '../Encabezado/Logo/Logo.jsx'

const HeaderSimple = () => {
    const navigate = useNavigate();
    return(
        <div className='headerSimple'>
            <Logo/>
        </div>
    );
}

export default HeaderSimple;