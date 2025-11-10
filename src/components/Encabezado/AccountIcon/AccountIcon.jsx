import './AccountIcon.css'
import { Link } from 'react-router-dom';

export default function AccountIcon(){
    return(
        <div className="contenedorFlexAccount">
            <Link to="/perfil">
                <span className="material-symbols-outlined">
                    account_circle
                </span>
            </Link>
        </div>
    );
}