//npm run start:dev
const express = require('express')
const bp = require('body-parser')
const { apiControllers } = require('./controllers/apiControllers.js')
const { routerApiProducts } = require('./routers/routerApiProducts.js')
const app = express()

app.get('/', apiControllers.info)
app.use(routerApiProducts)

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server corriendo puerto: ${server.address().port}`)
})
server.on('error', error => { console.log(error.message) })