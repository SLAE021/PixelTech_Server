const router = require("express").Router();




router.get("/", (req, res, next) => {
  res.json("All good in here");
});


//ruta a productos
const productsRouter = require("./products.routes.js")
router.use("/products", productsRouter)

//auth reta
const authRouter = require("./auth.routes.js")
router.use("/auth", authRouter)





module.exports = router;
