import './BusquedaMovil.css'
import { useContext } from 'react';
import {MenuDeslizableContext} from '../../App'

const BusquedaMovil = () =>{
    const {toogleMostarBarraBusqueda} = useContext(MenuDeslizableContext);

    return(
        <div className="botonBuscarMovil" onClick={toogleMostarBarraBusqueda}>
            <span className="material-symbols-outlined">
            search
            </span>
        </div>
    );
}

export default BusquedaMovil;