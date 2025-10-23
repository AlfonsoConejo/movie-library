import './SkeletonActorReparto.css'

export default function SkeletonActorReparto(){
    return(
        <div className='SkeletonInfoActor'>
            <div className="SkeletonContenedorImagen"></div>
            <div className="SkeletonDatosActor">
                <p className='SkeletonNombreActor'></p>
                <p className='SkeletonNombrePersonaje'></p>
            </div>
        </div>
    );
}