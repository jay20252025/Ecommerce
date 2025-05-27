import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config.js'
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';

// Create app from express package
const app = express();
// Port number our app will start. If port can be found in enviroment variable it will be selected. Else it will start on 4000. 
const port = process.env.PORT || 4000;

await connectDB()
//Cloudinary
await connectCloudinary()

// Add URL of our frontend in the array. You can add multiple URL, all of which can access the backend. 
const allowedOrigins = ['http://localhost:5173', 'glittering-pegasus-efd4d7.netlify.app'];

// Endpoint to verify order using Stripe
app.post('/stripe', express.raw({type:'application/json'}), stripeWebhooks);


// Middleware configuration. All the request coming to the server will be passed using json method.
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));
 

// When we hit this path, it will execute arrow function. In Parameter , we get request and response.
// Arrow function returns res.send, which is sending 1 message. So when we hit this path we will get that message.
app.get('/', (req, res) => res.send("API is working"))

//userRoute
app.use('/api/user', userRouter)
// SellerRoute
app.use('/api/seller', sellerRouter)
// ProductRoute
app.use('/api/product', productRouter)
// cartRoute
app.use('/api/cart', cartRouter)
// address
app.use('/api/address', addressRouter)

// order
app.use('/api/order', orderRouter)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})