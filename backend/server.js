import express from 'express'
import authRoutes from "./routes/auth.route.js"
import movieRoutes from "./routes/movie.route.js"
import tvRoutes from "./routes/tv.route.js"
import searchRoutes from "./routes/search.route.js"
import moreinfoRoutes from './routes/moreinfo.route.js'; // adjust the path based on your file structure
import paymentRoutes from './routes/payment.route.js'; 
import { ENV_VARS } from "./config/envVars.js"
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser'
import {protectRoute} from './middleware/protectRoute.js'
// import { createPaymentIntent } from './controllers/payment.controller.js'
const app=express();
app.use(express.json()); //must be used above rotues deifnition
app.use(cookieParser()) //necessary for protectRoute


const port=ENV_VARS.PORT;  //using env_vars constant has been imported from the above file 
app.use("/api/v1/auth",authRoutes); 

app.use("/api/v1/movie",protectRoute,movieRoutes); 

app.use("/api/v1/tv",protectRoute,tvRoutes);  //this protectRoute is a middleware
//purpose: if someone want to visit the oute of the movies and tv , make sure that this route is protected means that logged in and authenticated

//to searhc for movies and shows and user , to make sure that the person shall be logged in we use above middleware wehre we use cookies and

// the above tells the Express app to use the routes defined in authRoutes under the base URL path /api/v1/auth.
//Benefit :- All authentication-related routes are logically grouped under /api/v1/auth, rather than cluttering server.js with multiple routes.
app.use("/api/v1/search",protectRoute,searchRoutes); 
app.use("/api/v1/moreinfo",protectRoute,moreinfoRoutes); 
app.use('/api/v1/payment', paymentRoutes);
// app.post('/create-payment-intent', createPaymentIntent);
 //allows us to use req.body in our app.post and get etc 
app.listen(port, ()=>{
    console.log("Server started at http://localhost:"+port)
    connectDB();
});



