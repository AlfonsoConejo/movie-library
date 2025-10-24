import './SkeletonInfoPeliculaTarjeta.css'

export default function SkeletonInfoPeliculaTarjeta(){
    return(
        <section className='SkeletonInfoPeliculaTarjeta'>
            <div className="SkeletonContenedorInformacion">
                <div className="SkeletonContenedorPoster">
                    <div className="SkeletonPoster"></div>
                </div>
                <div className="SkeletonInformacion">
                    <p className="SkeletonTitulo"></p>
                    <p className='SkeletonRandom'></p>
                    <div className="SkeletonContenedorScore">
                        <div className="SkeletonScore"></div>
                        <p className="SkeletonTextScore"></p>
                    </div>
                    <p className="SkeletonTagline"></p>
                    <p className="SkeletonTextoResumen"></p>

                    <p className="SkeletonResumen"></p>
                    <p className="SkeletonResumen"></p>
                    <p className="SkeletonResumen2"></p>

                    <p className="SkeletoNombre1"></p>
                    <p className="SkeletoNombre1"></p>
                </div>
            </div>
                
        </section>
    );
}