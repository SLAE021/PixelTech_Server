const express = require("express");
const router = express.Router()

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const productsRouter = require("./products.routes")
router.use("/products", productsRouter)

module.exports = router;
