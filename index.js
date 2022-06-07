const express = require("express");
const productosRouter = require("./routes/productosRouter")
const app = express();
const port = 8080; // este será el puerto donde correrá el server

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(__dirname + "/public"));
app.use("/api/productos", productosRouter) // paso el router

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)}).on("error", (err) => {
    console.log(err);
    throw err;
  });
