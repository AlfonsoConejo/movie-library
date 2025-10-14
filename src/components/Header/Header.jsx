import './Header.css';
import logo from '../../assets/movie-database-logo-md.png'
import Busqueda from '../Busqueda/Busqueda';
import { Link } from 'react-router-dom';

export default function Header(){
    return(
        <header>
            <img src={logo} alt="Logo" />
            <Busqueda/>
            <nav>
                <ul>
                    <li><Link to="/peliculas">Películas</Link></li>
                    <li><Link to="/series">Series</Link></li>
                    <li><Link to="/personas">Personas</Link></li>
                </ul>
            </nav>
            

        </header>
        
    );
}