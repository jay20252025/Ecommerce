import jwt from 'jsonwebtoken';

// Login Seller : /api/seller/login (API endpoint)

export const sellerLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            // generate token for seller login
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
            // set token in the cookie
            // httpOnly:true, prevents JS from accessing the cookie
            res.cookie('sellerToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // use securecookie in production
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
                maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time
            });

            // send response back to user
            return res.json({ sucess: true, message: "Logged In" });

        } else {
            return res.json({ sucess: false, message: "Invalid Credentials" });
        }

    } catch (error) {
        console.log(error.nmessage);
        return res.json({ sucess: false, message: error.message })
    }
}



// Seller isAuth : /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        
        return res.json({ sucess: true })


    } catch (error) {
        console.log(error.nmessage);
        return res.json({ sucess: false, message: error.message })
    }

}

// Logout Seller : /api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ sucess: true, message: "Logged Out" });

    } catch (error) {
        console.log(error.nmessage);
        return res.json({ sucess: false, message: error.message })
    }
}