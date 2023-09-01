import React from 'react'
import '../Home.css'
import mrsMaiselImage from "../images/portada.jpg"
import instagram from "../images/instagram.png"
import facebook from "../images/facebook.png"


const home = () => {
  return (
    <div className="Home">
    <header className="Home-header">
      <h1>The Marvelous Mrs. Maisel</h1>
      <img
        src={mrsMaiselImage}
        alt="The Marvelous Mrs. Maisel"
        className="show-image"
      />
      <p className="description">
        "The Marvelous Mrs. Maisel" es una serie de televisión que sigue las aventuras de Miriam "Midge" Maisel, una ama de casa en Nueva York durante la década de 1950. Después de que su vida da un giro inesperado, Midge descubre su talento para la comedia y se lanza al mundo del stand-up. La serie combina humor, moda y una mirada a los desafíos de una mujer en una sociedad tradicional.
      </p>
      <br></br><br></br><br></br><br></br>
      <p className="description">
      En esta página haremos la descripción de cada uno de los personajes que hacen vida en la serie, además, forma parte de un proyecto ambicioso en el mundo de las series de TV.
      </p>
    </header>


    <footer className="Home-footer">
        <div className="social-media">
          <a href="https://www.instagram.com/yolgregnita/" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" />
          </a>
          
          <a href="https://www.facebook.com/yolgreg" target="_blank" rel="noopener noreferrer">
            <img src={facebook} alt="Facebook" />
          </a>
          
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} Yolgreg Gonzalez. Todos los derechos reservados.
        </p>
    </footer>
  </div>
  )
}

export default home