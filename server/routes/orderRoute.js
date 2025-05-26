import express from 'express';
import authUser from '../middleware/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/orderController.js';
import authSeller from '../middleware/authSeller.js';

const orderRouter = express.Router();

// Different Routes
// placing an order using Cash on delivery.
orderRouter.post('/cod', authUser, placeOrderCOD );
orderRouter.get('/user', authUser, getUserOrders );
orderRouter.get('/seller', authSeller, getAllOrders);
// placing an order using online on delivery.
orderRouter.post('/stripe', authUser, placeOrderStripe );

export default orderRouter