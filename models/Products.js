const mongoose = require("mongoose");

//*crear un modelo
const Schema = mongoose.Schema;


const productSchema = new Schema({
    name:{
        type: String,
        required:true,
    },
    description: {
        type:String,
        required:true,
    },
    price: {
        type:Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
})
//* Crear y exportar el modelo Student
const Products = mongoose.model("Product", productSchema);


module.exports = Products;