const router = require("express").Router();




router.get("/", (req, res, next) => {
  res.json("All good in here");
});


//ruta a productos
const productsRouter = require("./products.routes")
router.use("/products", productsRouter)

module.exports = router;
