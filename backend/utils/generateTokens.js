import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';  //must put extyension js 

export const generateTokenAndSetCookie=(userId,res)=>{  //first argument neeche is the payload whcih is unique and second is secret
const token=jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn:"15d"}) //last one is this token will expire in 15 days 
//now this token is added in the cookies

res.cookie("jwt-netflix",token,{
    maxAge:15*24*60*60*1000, //15 days in milliseconds  , this  done to make token more secure
    httpOnly:true, //this makes ure that the cookie is onyl accessible by browser and not  java script , help prevent hacking
    sameSite:"strict",
    secure:   ENV_VARS.NODE_ENV !== "development"  //this shall be only true when we deploy it 
})

return token;
}
