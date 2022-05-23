import express from "express"
import Contenedor from "./app.js"

const app=express()

app.get("/",async (req,resp)=>{
    const archivoTxt = new Contenedor("./entrega2.json")
    let respuesta=await archivoTxt.getAll()
    resp.send(respuesta)
})

app.get("/Random",async (req, resp)=>{
    const archivoTxt = new Contenedor("./entrega2.json")
    let respuesta=await archivoTxt.getAll()    
    let valorRandom= Math.ceil(Math.random()*respuesta.length)
    resp.send(respuesta.find(e=>e.id===valorRandom))
})

const PORT = 3000
const server = app.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error=> console.log(`Error en servidor ${error}`))