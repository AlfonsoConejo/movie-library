import './BarraBusqueda.css'

const BarraBusqueda = ({isSearchBarOpen, toogleMostarBarraBusqueda}) => {
    return(
        <div className={`barraBusqueda ${isSearchBarOpen ? 'visible' : ''}`}>
            <button className="botonSalirBusqueda" onClick={toogleMostarBarraBusqueda}>
                <span className="material-symbols-outlined"> arrow_back </span>
            </button>
            <div className="contenedorBusquedaMovil">
                <div className="cuadroBusqueda">
                    <button>
                        <span class="material-symbols-outlined">search</span>
                    </button>
                    <input type="text" placeholder='Buscar en TMDB'/>
                </div>
            </div>
        </div>
    );
}

export default BarraBusqueda;