const express = require("express");
const router = express.Router();

// POST route for adding a new product
router.post("/add-product", (req, res, next) => {
  const { name, price, description } = req.body;

  Product.create({ name, price, description })
    .then((product) => res.status(201).json(product))
    .catch((err) => next(err));

  res.status(201).json({ message: "Producto agregado exitosamente" });
});

module.exports = router;
