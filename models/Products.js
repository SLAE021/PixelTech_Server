const mongoose = require("mongoose");

//*crear un modelo
;
//const productSchema = new Schema
const productSchema = mongoose.Schema({
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
        
    }
})
//* Crear y exportar el modelo 
const Products = mongoose.model("Product", productSchema);


module.exports = Products;