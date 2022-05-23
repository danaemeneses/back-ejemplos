const { Router } = require('express')
const express = require('express')
const { apiControllers } = require('../controllers/apiControllers.js')

const routerApiProducts = new Router()

routerApiProducts.use(express.json())
routerApiProducts.use(express.urlencoded({ extended: true }))

routerApiProducts.get('/api/productos', apiControllers.getProducts)
routerApiProducts.get('/api/productos/:id', apiControllers.getProduct)
routerApiProducts.post('/api/productos', apiControllers.postProduct)
routerApiProducts.put('/api/productos/:id', apiControllers.putProduct)
routerApiProducts.delete('/api/productos/:id', apiControllers.deleteProduct)

module.exports = { routerApiProducts }