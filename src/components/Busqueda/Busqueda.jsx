import './Busqueda.css';
export default function Busqueda(){
    return(
        
        <div className="contenedor-busqueda">
            <div className='cuadro-busqueda'>
                <div className='seach-icon-wrapper'>
                    <span className="material-symbols-outlined">search</span>
                </div>
                <input className="input-busqueda" type="text" id="texto_busqueda" name="texto_busqueda" placeholder="Buscar película, serie o actor" />
            </div>
            
        </div>
    );
}