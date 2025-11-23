import './HeaderSimple.css'
import imageLogo from '../../assets/brible-logo.png';
import { useNavigate } from 'react-router-dom';

const HeaderSimple = () => {
    const navigate = useNavigate();
    return(
        <div className='headerSimple'>
            <div className="wrapperLogo">
                <img src={imageLogo} alt="Logo" onClick={() => navigate('/')}/>
            </div>
        </div>
    );
}

export default HeaderSimple;