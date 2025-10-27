import './BarraBusqueda.css'

const BarraBusqueda = ({isSearchBarOpen, toogleMostarBarraBusqueda}) => {
    return(
        <div className={`barraBusqueda ${isSearchBarOpen ? 'visible' : ''}`}>
            <button className="botonSalirBusqueda" onClick={toogleMostarBarraBusqueda}>
                <span className="material-symbols-outlined"> arrow_back </span>
            </button>
        </div>
    );
}

export default BarraBusqueda;