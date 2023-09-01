import React from 'react'
import '../App.css'
import { AiOutlineCloseSquare } from "react-icons/ai"

const FormTable = ({handleSubmit, handleOnChange, handleClose, rest}) => {
  return (
    <div className="addContainer">

    <form onSubmit={handleSubmit} className="form-control">
        <div className="close-btn" onClick={handleClose}><AiOutlineCloseSquare /></div>

        <div className="form-group ">
            <label for="nameActor" className="form-label">Nombre Actor: </label>
            <input type="text" className="form-control" id="nombreActor" name="nombreActor" placeholder="Enter Actor name" onChange={handleOnChange} value={rest.nombreActor}></input>
        </div>
       
        <div className="form-group">
            <label for="namePersonaje" className="form-label">Nombre Personaje: </label>
            <input type="text" className="form-control" id="nombrePersonaje" name="nombrePersonaje" placeholder="Enter Character name" onChange={handleOnChange} value={rest.nombrePersonaje}></input>
        </div>

        <div className="form-group">
            <label for="descripcion" className="form-label">Descripcion del Personaje: </label>
            <textarea type="text" rows="5" className="form-control" id="descripcion" name="descripcion" placeholder="Enter Character description" onChange={handleOnChange} value={rest.descripcion}></textarea>
        </div>

        <div className="form-group">
            <label for="imageURL" className="form-label">Imagen del Personaje: </label>
            <input type="text" className="form-control" id="imageURL" name="imageURL" placeholder="Enter Character Image" onChange={handleOnChange} value={rest.imageURL}></input>
        </div>

         <button type="submit" className="btn btn-success">Guardar</button>
    </form>
</div>
  )
}

export default FormTable