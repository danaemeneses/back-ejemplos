const express = require("express");
const router = express.Router();
const Contenedor = require("../container")
const contenedor = new Contenedor("productos.txt")

router.get("/", async (req, res) => {
  res.json(await contenedor.getAll());
});

router.post("/", async (req, res) => {
  if (!req.body.title && !req.body.price && !req.body.thumbnail) {
    res.status(400).json({ message: "Title, price and thumbnail are required"});
  }
  const product = await contenedor.save(req.body);
  res.json(product);
});

router.get("/:id", async (req, res) => {
  const product = await contenedor.getById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "product no encontrado" });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await contenedor.updateById(id, req.body);
  res.json(product);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await contenedor.deleteById(id);
  res.send({ message: "product eliminado" });
});

module.exports = router;
