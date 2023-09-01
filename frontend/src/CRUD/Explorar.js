import React, { useEffect, useState } from "react";
import '../App.css';
import axios from "axios";
import '../Home.css'
import instagram from "../images/instagram.png"
import facebook from "../images/facebook.png"

const Explorar = () => {
    // ACA HACEMOS EL ENVIO DE ALGUN NOMBRE DE PELICULA Y CON EL HANDLESEARCH LA ENVIAMOS A LA API
    const [explore, setExplore] = useState([])
    const [movieName, setMovieName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    // EN EL HANDLESEARCH CONCATENAMOS EL CONTENIDO DEL INPUT Y LO ENVIAMOS A LA API.


    const handleSearch = async () => {
        if (movieName.trim() === "") {
            setErrorMessage("Debes ingresar un nombre de película.");
            return;
        }

        const data = await axios.get(`/explorar?movieName=${encodeURIComponent(movieName)}`);
        console.log(data)
        if (data.data.success) {
            setExplore(data.data.data.description);
            setErrorMessage("");
        } else {
            setErrorMessage("No se encontraron resultados.");
        }
    };

    useEffect(() => {
        handleSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps             
    }, []);
    // Esta linea de arriba, se usó para poder corregir un error que daba cuando se cargaba la pagina por primera vez

    return (
        <div className="container">
            <h2 style={{ textAlign: "center", fontWeight: "bold" }}>Encuentra tus peliculas</h2>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
                <input type="text" className="form-control" placeholder="Nombre de la película, por ejemplo: Star Wars" value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                />
                <button onClick={handleSearch} className="btn btn-success">Buscar</button>
            </div>
            <div className="tableContainer">
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {explore.length > 0 ? (
                        explore
                        .sort((a, b) => a['#YEAR'] - b['#YEAR']) // LISTAMOS POR ORDENAMIENTO ASCENDENTE DE AÑOS DE PELICULAS, SI COLOCAMOS B, A ES DESCENDENTE
                        .map((movie, index) => (
                            <div key={index} style={{ border: "3px solid black", borderRadius: "20px", padding: "25px", margin: "20px", width: "30%" }}>
                                <p><strong>Titulo:</strong> <span style={{ color: "#990e37", fontSize: "20px", fontWeight: "bold" }}>{movie['#TITLE']}</span> </p>
                                <p><strong>Año:</strong> <span style={{ color: "#990e37", fontSize: "20px", fontWeight: "bold" }}>{movie['#YEAR']}</span></p>
                                <p><strong>Actores:</strong> <span style={{ color: "#990e37", fontSize: "20px", fontWeight: "bold" }}>{movie['#ACTORS']}</span></p>
                                {/* <p><strong>Ranking:</strong> <span style={{ color: "#990e37", fontSize: "20px", fontWeight: "bold" }}>{movie['#RANK']}</span></p> */}
                                <p><strong>Título:</strong> <a href={`${movie['#IMDB_URL']}`} target="_blank" rel="noopener noreferrer" style={{ color: "#990e37", fontSize: "20px", fontWeight: "bold" }}>{movie['#IMDB_URL']}</a></p>
                                {movie['#IMG_POSTER'] && <img src={movie['#IMG_POSTER']} alt={`${movie['#TITLE']} Poster`} style={{ maxWidth: "75%" }} />}
                            </div>
                        ))
                    ) : (
                        errorMessage && (
                            <h5 style={{ textAlign: "center", fontWeight: "bold"}}>{errorMessage}</h5>
                        )
                    )}
                </div>
            </div>

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

export default Explorar