import './Item.css';

export default function Item({poster_path, titulo, lanzamiento}){
    return(
        <div className='contenedorItem'>
            <img src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt={titulo} />
            <h1>{titulo}</h1>
            <p>{lanzamiento}</p>
        </div>
    );
}