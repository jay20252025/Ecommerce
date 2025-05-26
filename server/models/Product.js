import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: Array, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true},



}, {timestamp:true})

// Create user model using Schema above. If it exists then do first part before OR. 
const Product = mongoose.models.product || mongoose.model('product', productSchema)

export default Product