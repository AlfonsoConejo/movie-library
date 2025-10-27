import './Overlay.css'
import { useContext } from 'react';
import {MenuDeslizableContext} from '../../App'

const overlay = () => {
    const {isOverlayVisible, toogleMostarOcultarMenu, toogleMostarBarraBusqueda, isMenuOpen} = useContext(MenuDeslizableContext);

    return(
        <div className={`overlay ${isOverlayVisible ? 'visible' : '' }`} onClick={isMenuOpen ? toogleMostarOcultarMenu : toogleMostarBarraBusqueda}>
        </div>
    );
}

export default overlay;