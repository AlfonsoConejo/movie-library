import './CarruselFilmografia.css'
import ItemSmall from '../ItemSmall/ItemSmall';
import { useContext } from 'react';
import {creditosCombinadosContexto} from '../../paginas/movie'
import Item from '../Item/Item';
const CarruselFilmografia = () => {

    const {creditosCombinados} = useContext(creditosCombinadosContexto);

    //Combinamos los arreglos de cast & crew
    const combinados = [...(creditosCombinados.cast || []), ...(creditosCombinados.crew || [])];
    
    // eliminamos duplicados por id, conservando el primer objeto completo
    const combinadosUnicos = Array.from(
        new Map(combinados.map(item => [item.id, item])).values()
    );

    // Ordenar por fecha (descendente) y limitar a 9
    const combinadosOrdenados = combinadosUnicos
    .sort((a, b) => {
        const fechaA = a.release_date || a.first_air_date || "0000";
        const fechaB = b.release_date || b.first_air_date || "0000";
        return fechaB.localeCompare(fechaA);
    })
    .slice(0, 10);

    console.log(combinadosOrdenados);
    return(
        <section className="contenedorCarruselFilmografia">
            <h2>Conocido/a por</h2>
            <div className='carruselFilmografia'>
                {combinadosOrdenados.length > 0 && combinadosOrdenados.map(proyecto => (
                <ItemSmall
                    key={proyecto.id}
                    posterPath={proyecto.poster_path}
                    titulo={proyecto.title || proyecto.name}
                    mediaType={proyecto.media_type}
                    id={proyecto.id}
                />
                ))}
            </div>
        </section>
    );
}

export default CarruselFilmografia;