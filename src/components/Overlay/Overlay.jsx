import './Overlay.css'
import { useContext } from 'react';
import { MenuDeslizableContext } from "../../context/MenuDeslizableContext.jsx";

const overlay = () => {
    const {isOverlayVisible, toogleMostarOcultarMenu, toogleMostarBarraBusqueda, isMenuOpen} = useContext(MenuDeslizableContext);

    return(
        <div className={`overlay ${isOverlayVisible ? 'visible' : '' }`} onClick={isMenuOpen ? toogleMostarOcultarMenu : toogleMostarBarraBusqueda}>
        </div>
    );
}

export default overlay;