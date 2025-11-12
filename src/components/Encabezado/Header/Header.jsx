import './Header.css';
import Logo from './../Logo/Logo';
import Busqueda from '../../Busqueda/Busqueda';
import Nav from './../Nav/Nav';
import AccountIcon from './../AccountIcon/AccountIcon';
import MenuHamburguesa from '../../MenuHamburguesa/MenuHamburguesa';
import BusquedaMovil from './../BusquedaMovil/BusquedaMovil';

export default function Header() {
    return (
        <header>
            <Logo/>
            <Busqueda />
            <Nav/>
            <AccountIcon/>
            <MenuHamburguesa/>
            <BusquedaMovil/>
        </header>
    );
}