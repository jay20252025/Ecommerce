import Address from "../models/Address.js";


// Add Address : /api/address/add
export const addAddress = async (req, res) => {
    try {
        const { address, userId } = req.body;
        console.log("In addAddress controller", address, userId);
        await Address.create({ ...address, userId });
        console.log("what up");
        res.json({ success: true, message: "Address added sucessfully" });
        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Get Address : /api/address/get
export const getAddress = async (req, res) => {
    try {
        // get userId from body
        const {userId } = req.body;
        // Get all addresses of user using userId
        const addresses = await Address.find({userId})
        // send response back to user with the addresses
        res.json({ success: true, addresses });
        
    } catch (error) {
         console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}