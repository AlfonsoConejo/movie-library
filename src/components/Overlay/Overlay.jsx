import './Overlay.css'
import { useContext } from 'react';
import {MenuDeslizableContext} from '../../App'

const overlay = () => {
    const {isOverlayVisible, toogleMostarOcultarMenu} = useContext(MenuDeslizableContext);

    return(
        <div className={`overlay ${isOverlayVisible ? 'visible' : '' }`} onClick={toogleMostarOcultarMenu}>
        </div>
    );
}

export default overlay;