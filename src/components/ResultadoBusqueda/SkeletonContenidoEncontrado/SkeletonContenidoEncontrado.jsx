import './SkeletonContenidoEncontrado.css'

const SkeletonContenidoEncontrado = ({mediaType}) => {
    if (mediaType === 'movie' || mediaType === 'tv'){
        return(
            <div className="skeletonContenidoEncontrado">
                <div className="skeletonContenedorPoster">
                </div>
                <div className="skeletonContenedorInformacion">
                    <h3 className="skeletonTitulo"></h3>
                    <div className="skeletonResumen"></div>
                    <div className="skeletonResumen2"></div>
                    <div className="skeletonResumen2"></div>
                </div>
            </div>
        );
    } else if (mediaType === 'person'){
        return(
            <div className="skeletonContenidoEncontrado">
                <div className="skeletonContenedorFoto">
                </div>
                <div className="skeletonContenedorInformacionActor">
                    <h3></h3>
                    <p></p>
                </div>
            </div>
        );
    }
}

export default SkeletonContenidoEncontrado;