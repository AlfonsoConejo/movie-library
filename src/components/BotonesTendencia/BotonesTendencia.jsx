import './BotonesTendencia.css'

export default function BotonesTendencia({botonPresionado, setBotonPresionado, setCargado}) {
    return(
        <div className='contenedor-botones-tendencia'>
            <button 
                className={`tendenciaOpcion ${botonPresionado === 'day' ? 'activo' : ''}`}
                onClick={() => {setBotonPresionado('day'); setCargado(false)}}
            >Hoy</button>
            <button 
                className={`tendenciaOpcion ${botonPresionado === 'week' ? 'activo' : ''}`}
                onClick={() => {setBotonPresionado('week'); setCargado(false)}}
            >Esta semana</button>
        </div>
    );
}