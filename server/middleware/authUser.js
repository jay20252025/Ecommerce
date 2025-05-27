import jwt from "jsonwebtoken";


// next will execute the controller function
const authUser = async (req, res, next) => {
    // get cookies from request. From the cookie we will extract the token. 
    //console.log("inside auth user", req.body);
    const { token } = req.cookies;
    // console.log("authUser", req.cookies);
    if (!token) {
        return res.json({ success: false, message: "Not Authorized" })
    }

    try {
     
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        if (tokenDecode.id) {
            // req.body = {};
            if(!req.body)
                req.body = {};
            req.body.userId = tokenDecode.id;

        } else {

            return res.json({ success: false, message: "Not Authorized" })
        }
        // console.log("About to call next from authUser")
        next();
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export default authUser;