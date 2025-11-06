import './SkeletonItem.css';

export default function Item({}){
    return(
        <div className='contenedorSkeletonItem'>
            <div className= "skeletonImagen"></div>
            <p className="skeletonTitulo"></p>
            <p className='skeletonFecha'></p>
        </div>
    );
}