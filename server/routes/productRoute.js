import express from 'express';
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';
import { upload } from '../configs/multer.js';
import authSeller from '../middleware/authSeller.js';
// maybe add.js to file extensions


const productRouter = express.Router();


// Different endpoints for product. In server.js, the first part of this string is 
productRouter.post('/add', upload.array(["images"]),authSeller, addProduct );
productRouter.get('/list', productList);
productRouter.get('/id', productById);
productRouter.post('/stock', authSeller, changeStock);



export default productRouter