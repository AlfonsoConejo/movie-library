import './App.css'
import Header from './components/Header/Header.jsx'
import Home from './paginas/Home.jsx'
import Item from './components/Item/Item.jsx'
import Carrusel from './components/Carrusel/Carrusel.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [msg, setMsg] = useState('');
  const [carrusel, setCarrusel] = useState([]);

  useEffect(() => {
    fetch('/api/movies/trending')
      .then(res => res.json())
      .then(data => setCarrusel(data.results)) // <-- guarda el array de películas
      .catch(err => console.error(err));
  }, []);

  return (
    <BrowserRouter>
      <Header/>
      <Carrusel
        titulo = 'Tendencia'
        peliculas = {carrusel}
      />
        <h1>{msg || 'Cargando...'}</h1>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
