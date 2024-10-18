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
      res.status(400).json({message: error});
      next(error);
    }
  });



  module.exports = router;

