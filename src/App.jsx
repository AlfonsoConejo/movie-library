import './App.css'
import Header from './components/Encabezado/Header/Header.jsx'
import Home from './paginas/Home.jsx'
import Movie from './paginas/movie.jsx'
import Footer from './components/Footer/Footer.jsx'
import Overlay from './components/Overlay/Overlay.jsx'
import BarraBusqueda from './components/Encabezado/BarraBusqueda/BarraBusqueda.jsx'
import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useRef, useContext } from 'react'
import MenuDeslizable from './components/MenuDeslizable/MenuDeslizable.jsx'
import { MenuDeslizableContext } from "./context/MenuDeslizableContext.jsx";
import Proximamente from './paginas/Proximamente.jsx'
import Buscar from './paginas/Buscar.jsx'
import Login from './auth/pages/Login.jsx'
import Registro from './auth/pages/Registro.jsx'
import Perfil from './paginas/Perfil.jsx'
import NotFound from './paginas/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ConfirmarCuenta from './paginas/ConfirmarCuenta.jsx'
import { ToastContext } from "./context/ToastContext.jsx";
import ToastNotification from './components/ToastNotification/ToastsNotifications.jsx';

function App() {

  const { toasts } = useContext(ToastContext);

  // Rutas donde sí se mostrarán el header y el footer 
  const location = useLocation();
  const showLayoutPaths = ["/", "/:movie/:id", "/peliculas", "/series", "/personas", "/buscar", "/perfil"];
  const showLayout =
  showLayoutPaths.includes(location.pathname) ||
  location.pathname.startsWith("/movie/") ||
  location.pathname.startsWith("/person/") ||
  location.pathname.startsWith("/tv/");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [searchWord, setSearchWord] = useState('');

  //Referencia para el input de búsqueda
  const searchInputRef = useRef(null); 

const handleSearchFocus = () => {
    searchInputRef.current?.focus();
};

  const toogleMostarOcultarMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOverlayVisible(!isOverlayVisible);
  }

  const toogleMostarBarraBusqueda = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
    setIsOverlayVisible(!isOverlayVisible);
  }

  return (
    <div className="app">
      <MenuDeslizableContext.Provider value={{isMenuOpen, isOverlayVisible, toogleMostarOcultarMenu, isSearchBarOpen, toogleMostarBarraBusqueda, searchWord, setSearchWord, searchInputRef, handleSearchFocus}}>
        {showLayout && <Header />}
        {showLayout && <BarraBusqueda />}
        {showLayout && <MenuDeslizable />}
        {showLayout && (
          <Overlay
            isSearchBarOpen={isSearchBarOpen}
            toogleMostarBarraBusqueda={toogleMostarBarraBusqueda}
          />
        )}
      </MenuDeslizableContext.Provider>
      {showLayout && 
        <BarraBusqueda 
        isSearchBarOpen = {isSearchBarOpen}
        toogleMostarBarraBusqueda = {toogleMostarBarraBusqueda}
        searchWord = {searchWord}
        setSearchWord = {setSearchWord}
        searchInputRef = {searchInputRef}
      />}
      
      <main>
        <Routes>
          {/* Rutas públicas*/}
          <Route path="/" element={<Home/>}/>
          <Route path="/:media_type/:id" element={<Movie/>}/>
          <Route path="/peliculas" element={<Proximamente/>}/>
          <Route path="/series" element={<Proximamente/>}/>
          <Route path="/personas" element={<Proximamente/>}/>
          <Route path="/buscar" element={<Buscar/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registro" element={<Registro/>}/>
          <Route path="/confirmarCuenta/:token"element={<ConfirmarCuenta/>}/>

          {/* Rutas protegidas*/}
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            } 
          />

          {/* Todas las rutas no declaradas*/}
          <Route path="*" element={<NotFound />} />

        </Routes>
      
        {showLayout && <Footer/>}
      </main>

      <div className="toast-container">
        {toasts.map(t => (
          <ToastNotification 
            key={t.id} 
            id={t.id} 
            type={t.type} 
            title={t.title} 
            message={t.message} 
          />
        ))}
      </div>
    </div>
  )
}

export default App
