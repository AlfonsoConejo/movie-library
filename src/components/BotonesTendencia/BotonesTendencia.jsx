import './BotonesTendencia.css'

export default function BotonesTendencia({botonPresionado, setBotonPresionado}) {
    return(
        <div className='contenedor-botones-tendencia'>
            <button 
                className={`tendenciaOpcion ${botonPresionado === 'day' ? 'activo' : ''}`}
                onClick={() => {setBotonPresionado('day'); }}
            >Hoy</button>
            <button 
                className={`tendenciaOpcion ${botonPresionado === 'week' ? 'activo' : ''}`}
                onClick={() => {setBotonPresionado('week'); }}
            >Esta semana</button>
        </div>
    );
}