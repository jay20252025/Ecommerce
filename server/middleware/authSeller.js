import jwt from 'jsonwebtoken'

const authSeller = async (req, res, next) => {
    // Extract sellerToken from req.cookies
    const { sellerToken } = req.cookies;
    if (!sellerToken) {
        return res.json({ sucess: false, message: "Not Authorized" });
    }

    try {
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET)

        if (tokenDecode.email === process.env.SELLER_EMAIL) {
            next();

        } else {

            return res.json({ sucess: false, message: "Not Authorized" })
        }

    
    } catch (error) {
        return res.json({ sucess: false, message: error.message });
    }
}

export default authSeller