//we protect it by suignt he token from he cookies and verifying it 

import { User } from '../model/user.model.js';
import { ENV_VARS } from '../config/envVars.js';
import jwt from 'jsonwebtoken';

export const protectRoute=async(req,res,next)=>{  //her enext means that once verified it will redirect to what you searche dlike movie/tv etc so next is there 
try {
    const token=req.cookies["jwt-netflix"]

    if(!token){
        return res.status(401).json({success:false,message:"Unauthorized.No token provided "})
    }

    const decoded= jwt.verify(token,ENV_VARS.JWT_SECRET);
    if(!decoded){
        return res.status(401).json({success:false,message:"Unauthorized.Invalid Token "})  
    }

    //sinc ein the geenrateToken file we used userId in jwt 
    const user=await User.findById(decoded.userId).select("-password")

    if(!user){
        return res.status(404).json({success:false,message:"User Not Found "})  
    
    }

req.user=user;
    next();//next function claled in case everything wokrs out well
} catch (error) {
   console.log("Error in protectRoute Middleware : "+error)
   res.status(500).json({success:false,message:"Server error"})  
}
}
