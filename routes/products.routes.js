const express = require("express");
const router = express.Router();
const Products = require("../routes/products.routes");


router.get("/", async(req, res, next)=> {
    try{
        const products = await Products.find();
        res.json(products);

        } catch (error) {
            res.status(400).json({message: error})
            next(error);
        }
});

module.exports = router;