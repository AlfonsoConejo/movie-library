import './Header.css';
import logo from '../../assets/movie-database-logo-md.png';
import Busqueda from '../Busqueda/Busqueda';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
     const navigate = useNavigate();

    return (
        <header>
            <img src={logo} alt="Logo" onClick={() => navigate('/')} />
            <Busqueda />
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