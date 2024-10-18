const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const reviewSchema = new Schema({

    review: {
        type: String,
        required:true,
    },
    rating: {
        type: Number,
        required:true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    }
})

const Reviews = mongoose.model("Review", reviewSchema);

module.exports = Reviews; 