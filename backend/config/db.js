//in thsi connnect mongodb database atlas 
//mogodb atlas in a cloud based mongodb service that provides full security, backup and update to our database and we dont
//have to manually update and od these things unlike when we make a database separately like on our mongodb 

import mongoose from 'mongoose';
import {ENV_VARS} from './envVars.js'

export const  connectDB=async ()=>{
    try{
const conn=await mongoose.connect(ENV_VARS.MONGO_URI);
console.log("MongoDB connected : "+conn.connection.host);
    }
    catch(error){
console.log("Error connecting to MongoDB :"+error.message)
process.exit(1)
    }
}