const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const axios = require('axios')
const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

// CONEXION A MI BASE DE DATOS EN MONGODB

mongoose.connect(process.env.CONNECTION_STRING_REAL)
    .then(() => {
        console.log('Connectado a la BD en Mongo DB')
        app.listen(process.env.PORT, () => console.log("Server is Full Running"))
    })
    .catch((err) => console.log(err))

//SCHEMA PERSONAJES

const schemaData = mongoose.Schema({
    nombreActor: String,
    nombrePersonaje: String,
    descripcion: String,
    imageURL : String,
}, {
    timestamps: true
})

// MODELO DE LA TABLA PERSONAJES, ENVIO DE SCHEMA PARA CREAR LA TABLA
const personajeModel = mongoose.model("personaje", schemaData)

// DECALARACION DE METODOS HTTP 

// Leer personajes desde la MongoDB
app.get("/", async (req, res) => {
    const data = await personajeModel.find({})
    res.json(
        { success: true, data: data })
})

// Crear personaje y guardarlo en MongoDB
app.post("/crearpersonaje", async (req, res) => {
    console.log(req.body)
    const data = new personajeModel(req.body)
    await data.save()
    res.send({ success: true, message: "Datos guardados correctamente", data: data })
})

// Editar personaje y guardarlo en MongoDB
app.put("/editarpersonaje", async (req, res) => {
    console.log(req.body)
    const { _id, ...rest } = req.body
    const data = await personajeModel.updateOne({ _id: _id }, rest)
    res.send({ success: true, message: "Datos actualizados correctamente", data: data })
})

// Eliminar personaje y actualizar en MongoDB
app.delete("/eliminarpersonaje/:id", async (req, res) => {
    const id = req.params.id
    const data = await personajeModel.deleteOne({ _id: id })
    res.send({ success: true, message: "Datos eliminados correctamente", data: data })
})


// Conexion e iteraccion con la API Externa de IMDB SEACH
app.get("/explorar", async (req, res) => {

    const movieName = req.query.movieName; // Obtengo el valor del parámetro de consulta;
    if (!movieName) {
        return res.status(400).json({ success: false, message: "Debe proporcionar un nombre de película." });
    }
    const url = `https://imdb-search2.p.rapidapi.com/${encodeURIComponent(movieName)}`; // Le concateno a la URL de la API el nombre de la Pelicula que estamos buscando
    
    const options = {
        method: 'GET',
        url: url,
        headers: {
            'X-RapidAPI-Key': '83a05c5bf8msh5e4f36cfeccccffp106e47jsn63d03e6e4b07',
            'X-RapidAPI-Host': 'imdb-search2.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        res.json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: "Ocurrió un error.!" });
    }
});

