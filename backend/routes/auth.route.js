import express from 'express'
import {signup,login,logout,authCheck,deleteAccount} from '../controllers/auth.controllers.js'  //must add .js bcz used type=module
import { protectRoute } from '../middleware/protectRoute.js'; 

// Using router allows you to define routes in a separate file (like auth.route.js) rather than having all routes
//  in server.js. This helps keep your code organized and more maintainable, especially as the number of routes grows.
const router=express.Router();


router.post("/signup",signup)
//inki req.res wali cheez bhejdi hai in controllers wala folder

router.post("/login",login)

router.post("/logout",logout)
//extra added 
router.get("/authCheck",protectRoute,authCheck)

router.delete("/delete", protectRoute, deleteAccount);




export default router;
