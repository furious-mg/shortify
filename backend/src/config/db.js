import mongoose from "mongoose";

async function connectDB() {
    const uri = process.env.MONGODB_URI;

    mongoose.set("strictQuery", true);

    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully!");
    } catch (err){
        console.log("could not connect mongoDB : ". err.message);
        process.exit(1);
    }
}

export default connectDB;