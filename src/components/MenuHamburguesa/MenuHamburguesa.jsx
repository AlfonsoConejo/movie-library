import './MenuHamburguesa.css'
import { useContext } from 'react';
import {MenuDeslizableContext} from '../../App'

export default function MenuHamburguesa(){    

    const {toogleMostarOcultarMenu} = useContext(MenuDeslizableContext);

    return(
        <button className="menuHamburguesa" onClick={toogleMostarOcultarMenu}>
            <span className="material-symbols-outlined">
            menu
            </span>
        </button>
    );
}