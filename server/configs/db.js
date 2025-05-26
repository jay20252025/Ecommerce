import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Event that when connected will print console.log
        mongoose.connection.on('connected', () => console.log("Database Connected"));
        // This will connect to our db, provide string in connect method. We will provide the variable in the env file 
        await mongoose.connect(`${process.env.MONGODB_URI}/greencart`)

    } catch(error){
        console.log(error.message)
    }
}

export default connectDB