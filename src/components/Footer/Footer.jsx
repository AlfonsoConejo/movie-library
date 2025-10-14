import './Footer.css';
import TMDBlogo from '../../assets/TMDB_logo.svg';

export default function Footer(){
    return(
        <section className="footer">
            <span>Desarrollado por Alfonso Conejo con la API de The Movie Database</span>
            <img src={TMDBlogo} alt="TMDB Logo" />
        </section>
    )
}