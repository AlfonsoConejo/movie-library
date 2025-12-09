import './Header.css';
import Logo from './../Logo/Logo';
import Busqueda from '../../Busqueda/Busqueda';
import Nav from './../Nav/Nav';
import AccountIcon from './../AccountIcon/AccountIcon';
import MenuHamburguesa from '../../MenuHamburguesa/MenuHamburguesa';
import BusquedaMovil from './../BusquedaMovil/BusquedaMovil';
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import { useContext } from "react";
import { UserContext } from '../../../context/UserContext';

export default function Header() {
    const { user, cargandoUsuario } = useContext(UserContext);
    return (
        <header>
            <Logo/>
            <Busqueda />
            <Nav/>
            <MenuHamburguesa/>
            <div className="rightGroup">
                <BusquedaMovil/>
                <div className="profilePlaceholder">
                    { !cargandoUsuario && ( user ? <ProfileIcon/> : <AccountIcon/> ) }
                </div>
            </div>
                
        </header>
    );
}