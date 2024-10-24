const mongoose = require("mongoose");

//*crear un modelo
const Schema = mongoose.Schema;


const productSchema = new Schema({
    name:{
        type: String,
        required:false,
    },
    description: {
        type:String,
        required:false,
    },
    price: {
        type:Number,
        required: false,
    },
    category: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    }
})
//* Crear y exportar el modelo 
const Products = mongoose.model("Product", productSchema);


module.exports = Products;