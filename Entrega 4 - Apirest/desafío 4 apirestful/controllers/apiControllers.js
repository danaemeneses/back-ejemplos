const { ProductDao } = require('../databases/ProductDao');
const productDao = new ProductDao("productos.txt");
const testMSG = "API Test /";

const apiControllers = {
    info: (req, res) => {
        res.json(testMSG)
    },
    getProduct: async (req, res) => {
        const id = req.params.id
        try {
            const product = await productDao.getById(id);
            return res.json(product);
        } catch (error) {
            console.log(error.tipo)
            if (error.tipo === 'db not found') {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    },
    getProducts: async (req, res) => {
        res.json(await productDao.getAll())
    },
    postProduct: async (req, res) => {
        const personaAgregada = await productDao.save(req.body);
        res.status(201).json(personaAgregada)
    },
    putProduct: async (req, res) => {
        try {''
            const id = req.params.id
            const product = await productDao.update(req.body,id);
            return res.json(product);
        } catch (error) {
            if (error.tipo === 'db not found') {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    },
    deleteProduct: async (req, res) => {
        const id = req.params.id
        await productDao.deleteById(id);
        res.sendStatus(204);
    }
}

module.exports = { apiControllers }