import './ProfileOptions.css'
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext.jsx";

const ProfileOptions = ({showProfileOptions, setShowProfileOptions}) => {
    const { logout } = useContext(UserContext);
    return(
        <div className={`profileOptionsContainer ${showProfileOptions ? 'visible' : ''}`}>
            <ul className='first-list'>
                <li><Link to="perfil" onClick={()=>{setShowProfileOptions(false)}}>Perfil</Link></li>
                <li><Link onClick={()=>{setShowProfileOptions(false)}}>Ajustes</Link></li>
            </ul>
            <hr/>
            <ul className='second-list'>
                <li><button
                    className="logout"
                    onClick={() => {
                    setShowProfileOptions(false);
                    logout();
                    }}
                >
                    Cerrar sesión
                </button></li>
            </ul>
        </div>
    );
}

export default ProfileOptions;