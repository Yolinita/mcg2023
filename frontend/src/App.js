import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import './Home.css'
import imagenInicio from "./images/imagen_inicio.jpg"
import ABMPersonajes from './CRUD/ABMPersonajes'
import IndexPersonajes from './CRUD/IndexPersonajes'
import Home from './CRUD/home'
import Explorar from './CRUD/Explorar'

function App() {
  const isRootPage = window.location.pathname === '/';
  return (
    <>
    
      <div className="menu">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">        
            <a className="navbar-brand" href="/">Marvelous Mrs. Maisel</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="home">Inicio</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link " aria-current="page" href="index">Personajes</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="ABMPersonajes">Gestion de Personajes</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="Explorar">Contenido Interactivo</a>
                </li>
              </ul>
            </div>
        </nav>
      </div>

      {isRootPage && 
      <div className="inicio">
          <img
          src={imagenInicio}
          alt="The Marvelous Mrs. Maisel"
          className="imageInicio"
        /> </div>}
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} exact></Route>
          <Route path='/index' element={<IndexPersonajes />} exact></Route>
          <Route path='/ABMPersonajes' element={<ABMPersonajes />} exact></Route>
          <Route path='/Explorar' element={<Explorar />} exact></Route>
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
