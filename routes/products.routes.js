const express = require("express");
const router = express.Router();
const Products = require("../models/Products");


router.get("/", async(req, res, next)=> {
    try{
        const products = await Products.find();
        res.status(200).json(products);
        console.log(products, "holaaaaaa")
        } catch (error) {
            res.status(400).json({message: error})
            next(error);
        }
});

module.exports = router;