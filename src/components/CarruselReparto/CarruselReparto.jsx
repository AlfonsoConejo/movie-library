import './CarruselReparto.css'
import ActorReparto from '../ActorReparto/ActorReparto';

export default function CarruselReparto({reparto}) {

    reparto = reparto || [];

    console.log(reparto);
    return(
        <section className='contenedorCarruselReparto'>
            <h2>Reparto</h2>
            <div className='carruselReparto'>
                {reparto.length && reparto.slice(0, 9).map(persona => (
                    <ActorReparto
                        key={persona.id}
                        id = {persona.id}
                        nombre = {persona.original_name}
                        personaje = {persona.character}
                        rutaImagen = {persona.profile_path}
                    />
                ))}
            </div>
        </section>
    );
}