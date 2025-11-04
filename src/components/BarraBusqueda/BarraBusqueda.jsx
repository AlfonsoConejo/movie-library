import './BarraBusqueda.css'
import { useNavigate } from 'react-router-dom';

const BarraBusqueda = ({isSearchBarOpen, toogleMostarBarraBusqueda, searchWord, setSearchWord}) => {
    const navigate = useNavigate();

    const navigateToSearch = () =>  {
        if (!searchWord.trim()) return; // evita búsqueda vacía
        setSearchWord('');
        toogleMostarBarraBusqueda();
        navigate(`/buscar?busqueda=${searchWord.trim()}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
        navigateToSearch();
        }
    };

    return(
        <div className={`barraBusqueda ${isSearchBarOpen ? 'visible' : ''}`}>
            <button className="botonSalirBusqueda" onClick={toogleMostarBarraBusqueda}>
                <span className="material-symbols-outlined"> arrow_back </span>
            </button>
            <div className="contenedorBusquedaMovil">
                <div className="cuadroBusqueda">
                    <button onClick={navigateToSearch}>
                        <span className="material-symbols-outlined">search</span>
                    </button>
                    <input type="text" placeholder='Buscar en TMDB' value={searchWord} onChange={(e)=> {setSearchWord(e.target.value)}} onKeyDown={handleKeyDown}/>
                </div>
            </div>
        </div>
    );
}

export default BarraBusqueda;