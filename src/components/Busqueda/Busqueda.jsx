import './Busqueda.css';
import { useContext } from 'react';
import {MenuDeslizableContext} from '../../App'
import { useNavigate } from 'react-router-dom';


export default function Busqueda(){
    const {searchWord, setSearchWord} = useContext(MenuDeslizableContext);
    const navigate = useNavigate();

    const navigateToSearch = () =>  {
        if (!searchWord.trim()) return; // evita búsqueda vacía
        setSearchWord('');
        navigate(`/buscar?busqueda=${searchWord.trim()}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
        navigateToSearch();
        }
    };

    return(
        
        <div className="contenedorFlexBusqueda">
            <div className='cuadro-busqueda'>
                <button className='seach-icon-wrapper' onClick={navigateToSearch}>
                    <span className="material-symbols-outlined">search</span>
                </button>
                <input className="input-busqueda" type="text" id="texto_busqueda" name="texto_busqueda" value={searchWord} onChange={(e)=> {setSearchWord(e.target.value)}} onKeyDown={handleKeyDown} placeholder="Buscar película, serie o actor" />
            </div>
        </div>
    );
}