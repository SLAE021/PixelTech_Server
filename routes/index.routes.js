const router = require("express").Router();




router.get("/", (req, res, next) => {
  res.json("All good in here");
});


//ruta a productos
const productsRouter = require("./products.routes.js")
router.use("/products", productsRouter)

//auth ruta
const authRouter = require("./auth.routes.js")
router.use("/auth", authRouter)

//ruta a Reviews
const reviewsRouter = require("./reviews.routes.js")
router.use("/reviews", reviewsRouter)


module.exports = router;
