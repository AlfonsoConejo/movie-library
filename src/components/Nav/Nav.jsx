import './Nav.css'
import { Link } from 'react-router-dom';

export default function Nav() {

    return (
        <div className="contenedorFlexNav">
            <nav>
                <ul>
                    <li><Link to="/peliculas">Películas</Link></li>
                    <li><Link to="/series">Series</Link></li>
                    <li><Link to="/personas">Personas</Link></li>
                </ul>
            </nav>
        </div>
    );
}