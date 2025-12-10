import './ProfileOptions.css'
import { Link } from 'react-router-dom';

const ProfileOptions = ({showProfileOptions}) => {
    return(
        <div className={`profileOptionsContainer ${showProfileOptions ? 'visible' : ''}`}>
            <ul className='first-list'>
                <li><Link to="perfil">Perfil</Link></li>
                <li><Link>Ajustes</Link></li>
            </ul>
            <hr/>
            <ul className='second-list'>
                <li><Link className='logout'>Cerrar sesión</Link></li>
            </ul>
        </div>
    );
}

export default ProfileOptions;