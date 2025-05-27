import { v2 as Cloudinary } from "cloudinary";
import Product from "../models/Product.js";

// Add Product : /api/product/add
export const addProduct = async (req, res) => {
    try {
        console.log(req.body.productData);
        // get data from request
        let productData = JSON.parse(req.body.productData);
        // Get images from request. Images in an array.
        const images = req.files;

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await Cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url;
            })
        )
        await Product.create({ ...productData, image: imagesUrl });
        res.json({ sucess: true, message: "Product Added" })

    } catch (error) {
        console.log(error.message);
        res.json({ sucess: false, message: error.message })
    }

}

// Get All Product : /api/product/list
export const productList = async (req, res) => {
    try {
       // console.log("Did I call when going to Product List Page");
        const products = await Product.find({});
         
        res.json({ success: true, products })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


// Get single product : /api/product/id
export const productById = async (req, res) => {
    try {
        const { id } = req.body;
        // this will get single product by that id
        const product = await Product.findById(id);
        res.json({ sucess: true, product })

    } catch (error) {
        console.log(error.message);
        res.json({ sucess: false, message: error.message })
    }
}

// Change Product inStock : /api/product/stock
export const changeStock = async (req, res) => {
    try {

        const { id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, { inStock });
        res.json({ success: true, message: "Stock Updated" });


    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}