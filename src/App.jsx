import './App.css'
import Header from './components/Header/Header.jsx'
import Home from './paginas/Home.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMsg(data.message));
  }, []);

  return (
    <BrowserRouter>
      <Header/>
      <div>
        <h1>{msg || 'Cargando...'}</h1>
      </div>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
