import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



// Register User : /api/user/register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }
        const existingUser = await User.findOne({ email });

        if (existingUser)
            return res.json({ success: false, message: "User already exists" })

        // if user does not exist with the email sent in, then create the user and encrypt the password
        // For encryption we use package called bcrypt.
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword })

        // Create token. When we create a new user in mongo, it will create a property _id that will be unique for each user.
        // We will use a secret key to create a token. This secret key will be stored in environment variable. 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        // Send response with token value, 
        // httpOnly:true, prevents JS from accessing the cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // use securecookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time
        });

        return res.json({ success: true, user: { email: user.email, name: user.name } })

    }
    catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message })
    }
}

// User Login : /api/user/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: "Email and password are required" })
        }
        // Find user using email
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid email or password" })
        }

        // Compare password sent in request body vs password stored in database. isMatch will be true or false.
        const isMatch = await bcrypt.compare(password, user.password)
        // if isMatch is false, send back message
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid email or password" })
        }

        // isMatch is true, Create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        // Send response with token value, 
        // httpOnly:true, prevents JS from accessing the cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // use securecookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time
        });

        return res.json({ success: true, user: { email: user.email, name: user.name } })



    } catch (error) {
        console.log(error.nmessage);
        return res.json({ success: false, message: error.message })
    }
}


// Check Auth : /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        const { userId } = req.body;
          console.log(userId);
        const user = await User.findById(userId).select("-password");
        return res.json({ success: true, user })


    } catch (error) {
        console.log(error.nmessage);
        return res.json({ success: false, message: error.message })
    }

}

// Logout User : /api/user/logout
export const logout = async (req, res) => {
    console.log("logout method", req.cookies);
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: "Logged Out" });

    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message })
    }
}