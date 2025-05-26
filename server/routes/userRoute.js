import express from 'express';
import { isAuth, login, logout, register } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';
// Create user router
const userRouter = express.Router();

// Post, In server.js, the first part of this string is /api/user/
userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/is-auth', authUser, isAuth)  // path, controller function
userRouter.get('/logout', authUser, logout)  

export default userRouter