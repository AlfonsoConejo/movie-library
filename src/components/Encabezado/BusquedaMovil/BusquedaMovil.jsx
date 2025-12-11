import './BusquedaMovil.css'
import { useContext } from 'react';
import { MenuDeslizableContext } from "../../../context/MenuDeslizableContext.jsx";

const BusquedaMovil = () =>{
    const {toogleMostarBarraBusqueda} = useContext(MenuDeslizableContext);
    const {handleSearchFocus} = useContext(MenuDeslizableContext);

    const activarBarraBusqueda = () =>{
        toogleMostarBarraBusqueda();
        handleSearchFocus();
    }

    return(
        <div className="botonBuscarMovil" onClick={activarBarraBusqueda}>
            <span className="material-symbols-outlined">
            search
            </span>
        </div>
    );
}

export default BusquedaMovil;