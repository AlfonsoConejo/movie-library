import './MenuDeslizable.css'
import {MenuDeslizableContext} from '../../App'
import { Link } from 'react-router-dom';
import { useContext } from "react";

const MenuDeslizable = () => {
    const {isMenuOpen, toogleMostarOcultarMenu} = useContext(MenuDeslizableContext);

    return(
        <div className={`menuDeslizable ${isMenuOpen ? 'visible' : '' }`}>
            <div className="menuEncabezado">
                <button className="close" onClick={toogleMostarOcultarMenu}>
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            <div className="EnlacesNavegacion">
                <ul>
                    <li><Link to="/" onClick={toogleMostarOcultarMenu}>Inicio</Link></li>
                    <li><Link to="/peliculas" onClick={toogleMostarOcultarMenu}>Películas</Link></li>
                    <li><Link to="/series" onClick={toogleMostarOcultarMenu}>Series</Link></li>
                    <li><Link to="/personas" onClick={toogleMostarOcultarMenu}>Personas</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default MenuDeslizable;