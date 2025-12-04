import './CarruselReparto.css'
import ActorReparto from '../ActorReparto/ActorReparto';
import SkeletonActorReparto from '../SkeletonActorReparto/SkeletonActorReparto';

export default function CarruselReparto({reparto, isLoading}) {

    if(isLoading){
        return(
        <section className='contenedorCarruselReparto'>
            <h2>Reparto</h2>
            <div className='carruselReparto'>
                {Array(11).fill().map((_,i)=><SkeletonActorReparto key={i}/>)}
            </div>
        </section>  
        ); 
    }

    reparto = reparto || [];
    return(
        <section className='contenedorCarruselReparto'>
            <h2>Reparto</h2>
            <div className='carruselReparto'>
                {reparto.length > 0 && reparto.slice(0, 9).map(persona => (
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