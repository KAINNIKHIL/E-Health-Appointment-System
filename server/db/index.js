import mongoose from "mongoose";
import {DB_NAME} from "../src/constant.js";
const connectDB = async()=> {
    try{
        const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`mongodb connected \n DB_HOST${connectionInstance.connection.host}`)
    }catch(error){
        console.log("MongoDB connection failed!");
        process.exit(1)
    }
}

export default connectDB