import './Paginador.css'

const Paginador = ({totalPaginas, paginaActual, setPagina}) => {

    const rango = 2 ;// Rango de paginas para mostrar

    //Calculamos los límites
    const inicio = Math.max(1, paginaActual - rango);
    const fin = Math.min(totalPaginas, paginaActual + rango);

    // Creamos el array de páginas a mostrar
    const paginas = [];
    for (let i = inicio; i <= fin; i++) {
        paginas.push(i);
    }

    if(totalPaginas > 1) {
        return(
            <div className="paginador">
                <button disabled={paginaActual === 1} onClick={() => setPagina(1)}> 
                    <span className="material-symbols-outlined">
                    keyboard_double_arrow_left
                    </span>
                </button>
                <button disabled={paginaActual === 1} onClick={() => setPagina(paginaActual - 1)}>
                    <span className="material-symbols-outlined">
                    keyboard_arrow_left
                    </span>
                </button>

                {paginas.map((num) => (
                    <button
                    key={num}
                    onClick={() => setPagina(num)}
                    className={num === paginaActual ? "pagina-activa" : ""}
                    >
                    {num}
                    </button>
                ))}

                <button disabled={paginaActual === totalPaginas} onClick={() => setPagina(paginaActual + 1)}>
                    <span className="material-symbols-outlined">
                    keyboard_arrow_right
                    </span>
                </button>
                <button disabled={paginaActual === totalPaginas} onClick={() => setPagina(totalPaginas)}> 
                    <span className="material-symbols-outlined">
                    keyboard_double_arrow_right
                    </span>
                </button>
            </div>
        );
    }
}

export default Paginador;