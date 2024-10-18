const express = require("express");
const router = express.Router();
const Reviews = require("../models/Reviews");
const { verifyToken } = require("../middlewares/auth.middlewares");




// POST "/api/reviews" => recibe la info de una review y la crea en la BD
router.post("/", verifyToken, async (req, res, next) => {
    try {
      const review = await Reviews.create(req.body);
      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({message: "error"});
      next(error);
    }
  });


  //PATCH "/api/reviews/:id"
  router.patch("/:id", verifyToken, async (req, res, next) => {
    try {
      const review = await Reviews.findByIdAndUpdate(req.params.id, req.body,{new: true}); 
      res.status(200).json(review);
      } catch (error) {
      res.status(400).json({message: "error"});
      next(error);
      }
  }
  );

  //GET "api/reviews/product_id" recibe todas las reviews de un producto por su id

  router.get("/:product_id", async (req, res, next) => {
    try {
      const reviews = await Reviews.find({ product_id: req.params.product_id});
      res.status(200).json(reviews);
    } catch (error) {
      res.status(400).json({message: "error"});
      next(error);
    }
  });


  //delete api/reviews/:id
  router.delete("/:id", verifyToken, async (req, res, next) => {
    try {
      await Reviews.findByIdAndDelete(req.params.id);
      res.status(204).json();
    } catch (error) {
      res.status(400).json({message: error});
      next(error);
    }
  });


  module.exports = router;

