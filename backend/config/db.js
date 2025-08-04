import mongoose from "mongoose";

export const connectDB = async () => {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://genova:genova123@cluster0.m9dxzuf.mongodb.net/food-del';
    await mongoose.connect(mongoURI).then(()=>console.log("DB Connected"));
}




