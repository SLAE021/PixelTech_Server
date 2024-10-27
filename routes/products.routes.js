const express = require("express");
const router = express.Router();
const Products = require("../models/Products");
const {verifyToken,verifyAdmin}= require("../middlewares/auth.middlewares")
const multer = require('multer');
const upload = multer();

// api/products-- muestra todos los productos--

router.get("/", async (req, res, next) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
    console.log(products, "holaaaaaa");
  } catch (error) {
    res.status(400).json({ message: "error" });
    next(error);
  }
});

// -- /api/products/6710ffaf2d2c620a8ef5a7ff -- lo despliaega por ID --

router.get("/:id", async (req, res, next) => {
  try {
    const products = await Products.findById(req.params.id);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: "error" });
    next(error);
  }
});

// --/api/products -- agrega producto Admin //! cambiar el estado a true al agregar productos desde client admin

router.post("/", upload.none(), verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const crearProduct = await Products.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.body.image,
    });

    res.status(201).json(crearProduct);
  } catch (error) {
    res.status(400).json({ message: "error" });
    next(error);
  }
});

///api/products/update/id-- actualizar un producto Admin

router.patch("/update/:id", upload.none(),verifyToken,verifyAdmin, async (req, res, next) => {
  try {
    await Products.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.body.image,
    });
    res.sendStatus(202);
  } catch (error) {
    res.status(400).json({ message: "no actualizado" });
    next(error);
  }
});


//--  /api/products/"y el id correspondiente"  Borrar productos por id
router.delete("/:id",verifyToken,verifyAdmin, async (req, res, next) => {
  try {
    await Products.findByIdAndDelete(req.params.id);
    res.sendStatus(202);
  } catch (error) {
    res.status(400).json({ message: "no se borro" });
    next(error);
  }
});

module.exports = router;
