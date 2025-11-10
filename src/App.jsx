import './App.css'
import Header from './components/Encabezado/Header/Header.jsx'
import Home from './paginas/Home.jsx'
import Movie from './paginas/movie.jsx'
import Footer from './components/Footer/Footer.jsx'
import Overlay from './components/Overlay/Overlay.jsx'
import BarraBusqueda from './components/Encabezado/BarraBusqueda/BarraBusqueda.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, createContext, useRef } from 'react'
import MenuDeslizable from './components/MenuDeslizable/MenuDeslizable.jsx'
import Proximamente from './paginas/Proximamente.jsx'
import Buscar from './paginas/Buscar.jsx'

//Creamos un contexto para manipular el menpu deslizable
export const MenuDeslizableContext = createContext();

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [searchWord, setSearchWord] = useState('');

  //Referencia para el input de búsqueda
  const searchInputRef = useRef(null); 

const handleSearchFocus = () => {
    searchInputRef.current?.focus();
    console.log('Esto se ejecutó');
};

  const toogleMostarOcultarMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOverlayVisible(!isOverlayVisible);
  }

  const toogleMostarBarraBusqueda = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
    setIsOverlayVisible(!isOverlayVisible);
  }


  // const [cargado, setCargado] = useState(false);
  // const [peliculas, setPeliculas] = useState([]);
  // const [botonPresionado, setBotonPresionado] = useState('day');

  // useEffect(() => {
  //   setCargado(false);
  //   fetch(`/api/trending/movies?time=${botonPresionado}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       setPeliculas(data.results) // <-- guarda el array de películas
  //       setCargado(true); // <-- guardamos que ya terminó de cargar
  //       console.log(data.results);
  //     })
  //     .catch(err => console.error(err));
  // }, [botonPresionado]);

  return (
    <BrowserRouter>
      <MenuDeslizableContext.Provider value={{isMenuOpen, isOverlayVisible, toogleMostarOcultarMenu, isSearchBarOpen, toogleMostarBarraBusqueda, searchWord, setSearchWord, searchInputRef, handleSearchFocus}}>
        <Header/>
        <MenuDeslizable/>
        <Overlay 
          isSearchBarOpen = {isSearchBarOpen}
          toogleMostarBarraBusqueda = {toogleMostarBarraBusqueda}
        />
      </MenuDeslizableContext.Provider>
      <BarraBusqueda 
        isSearchBarOpen = {isSearchBarOpen}
        toogleMostarBarraBusqueda = {toogleMostarBarraBusqueda}
        searchWord = {searchWord}
        setSearchWord = {setSearchWord}
        searchInputRef = {searchInputRef}
      />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:media_type/:id" element={<Movie/>}/>
        <Route path="/peliculas" element={<Proximamente/>}/>
        <Route path="/series" element={<Proximamente/>}/>
        <Route path="/personas" element={<Proximamente/>}/>
        <Route path="/buscar" element={<Buscar/>}/>
        <Route path="/perfil" element={<Proximamente/>}/>
      </Routes>
      <Footer/>
      
    </BrowserRouter>
  )
}

export default App
