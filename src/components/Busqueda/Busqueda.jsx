import './Busqueda.css';
export default function Busqueda(){
    return(
        <div className="contenedor-busqueda">
            <input className="cuadro-busqueda" type="text" id="texto_busqueda" name="texto_busqueda" placeholder="Buscar película, serie o actor" />
        </div>
    );
}