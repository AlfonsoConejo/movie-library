import './App.css'
import Header from './components/Header/Header.jsx'
import Home from './paginas/Home.jsx'
import Movie from './paginas/movie.jsx'
import Footer from './components/Footer/Footer.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
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
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:media_type/:id" element={<Movie/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
