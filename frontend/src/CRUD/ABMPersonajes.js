import React, { useEffect, useState } from "react";
import { RiUserAddFill } from "react-icons/ri"
import '../App.css';
import axios from "axios";
import { LiaUserEditSolid } from "react-icons/lia"
import { AiOutlineUserDelete } from "react-icons/ai"
import FormTable from "../components/FormTable"
import Modal from 'react-modal';
import '../Home.css'
import instagram from "../images/instagram.png"
import facebook from "../images/facebook.png"

// Establece la referencia al elemento raíz del modal
Modal.setAppElement('#root');

axios.defaults.baseURL = "http://localhost:8080/"

function ABMPersonajes() {
    // MODAL DE MENSAJES 
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

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

    // INICIO CREAR UN PERSONAJE
    const [addSection, setAddSection] = useState(false)
    const [formData, setFormData] = useState({
        nombreActor: "",
        nombrePersonaje: "",
        descripcion: "",
        imageURL: "",
    })

    const handleOnChange = (e) => {
        const { value, name } = e.target
        setFormData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await axios.post("/crearpersonaje", formData)
        if (data.data.success) {
            setAddSection(false)
            setSuccessMessage(data.data.message);
            openModal()
            getFetchData()
            setFormData({
                nombreActor: "",
                nombrePersonaje: "",
                descripcion: "",
                imageURL: "",
            })
        }
    }

    // FIN CREAR UN PERSONAJE

    // INICIO ELIMINAR PERSONAJE
    const handleDelete = async (id) => {
        const data = await axios.delete("/eliminarpersonaje/" + id)
        if (data.data.success) {
            getFetchData()
            setSuccessMessage(data.data.message)
            openModal()
        }
    }
    // FIN ELIMINAR PERSONAJE

    // INICIO EDITAR PERSONAJE
    const [editSection, setEditSection] = useState(false)
    const [formDataEdit, setFormDataEdit] = useState({
        nombreActor: "",
        nombrePersonaje: "",
        descripcion: "",
        imageURL: "",
        _id: ""
    })

    const handleUpdate = async (e) => {
        e.preventDefault()
        const data = await axios.put("/editarpersonaje", formDataEdit)
        console.log(data)
        if (data.data.success) {
            setEditSection(false)
            setSuccessMessage(data.data.message)
            openModal()
            getFetchData()
        }
    }

    const handleEditOnChange = async (e) => {
        const { value, name } = e.target
        setFormDataEdit((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleEdit = (el) => {
        setFormDataEdit(el)
        setEditSection(true)
    }
    // FIN EDITAR PERSONAJE

    return (
        <div className="container">
            <h1 style={{ textAlign: "center" }}>ABM de Personajes</h1>
            <button className="btn btn-success" data-toggle="button" aria-pressed="false" onClick={() => setAddSection(true)}> <RiUserAddFill /> Agregar Personaje</button>
            {
                addSection && (
                    <FormTable
                        handleSubmit={handleSubmit}
                        handleOnChange={handleOnChange}
                        handleClose={() => setAddSection(false)}
                        rest={formData}
                    />
                )
            }

            {
                editSection && (
                    <FormTable
                        handleSubmit={handleUpdate}
                        handleOnChange={handleEditOnChange}
                        handleClose={() => setEditSection(false)}
                        rest={formDataEdit}
                    />
                )
            }
            <div className="tableContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre Actor</th>
                            <th>Nombre Personaje</th>
                            <th>Descripcion</th>
                            <th>URL Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataList.length > 0 ? (
                                dataList.map((ele) => {
                                    return (
                                        <tr>
                                            <td>{ele.nombreActor}</td>
                                            <td>{ele.nombrePersonaje}</td>
                                            <td>{ele.descripcion}</td>
                                            <td>{ele.imageURL}</td>
                                            <td>
                                                <button type="submit" className="btn btn-primary" onClick={() => handleEdit(ele)}><LiaUserEditSolid /> Editar</button>
                                                <button type="submit" className="btn btn-danger" onClick={() => handleDelete(ele._id)}><AiOutlineUserDelete /> Eliminar</button>
                                            </td>
                                        </tr>
                                    )
                                }))
                                :
                                (
                                    <p style={{ textAlign: "center", fontSize: "30px" }}>Sin registros guardados.</p>
                                )
                        }
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Modal de Éxito"
                className="custom-modal" 
            >
                <h2>Operación Exitosa</h2>
                <p>{successMessage}</p> {/* Muestra el mensaje del backend */}
                <button className="btn btn-success" onClick={closeModal}>Cerrar</button>
            </Modal>

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

export default ABMPersonajes