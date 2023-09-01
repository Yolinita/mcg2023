import React, { useEffect, useState } from "react";
import '../App.css';
import axios from "axios";
import '../Home.css'
import instagram from "../images/instagram.png"
import facebook from "../images/facebook.png"


const IndexPersonajes = () => {
    // OBTENER LOS PERSONAJES
    const [dataList, setDataList] = useState([])

    const getFetchData = async () => {
        const data = await axios.get("/")
        if (data.data.success) {
            setDataList(data.data.data)
        }
    }
    useEffect(() => {
        getFetchData()
    }, [])

    return (
        <div className="container">
            <h2 style={{textAlign: "center", fontWeight: "bold"}}>Protagonistas de la serie The Marvelous Mrs. Maisel</h2>
            <div className="tableContainer">
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {dataList[0] ? (
                        dataList.map((ele, index) => (
                            <div key={index} style={{ border: "3px solid black", borderRadius: "20px" , padding: "25px", margin: "20px", width: "30%" }}>
                                <p><strong>Nombre Actor:</strong> <span style={{ color: "#990e37", fontSize: "20px" , fontWeight: "bold" }}>{ele.nombreActor}</span> </p>
                                <p><strong>Nombre Personaje:</strong> <span style={{ color: "#990e37", fontSize: "20px" , fontWeight: "bold" }}>{ele.nombrePersonaje}</span></p>
                                <p><strong>Descripción:</strong> <span style={{ color: "#990e37", fontSize: "20px" , fontWeight: "bold" }}>{ele.descripcion}</span></p>
                                {ele.imageURL && <img src={ele.imageURL} alt={`Imagen`} style={{ maxWidth: "50%" }} />}
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: "center", fontSize: "30px" }}>Sin registros guardados.</p>
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

export default IndexPersonajes