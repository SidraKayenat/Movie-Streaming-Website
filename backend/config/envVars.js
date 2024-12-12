import dotenv from "dotenv"
dotenv.config();

export const ENV_VARS={
    MONGO_URI: process.env.MONGO_URI,
    PORT:process.env.PORT || 5000,  //means if process.env ka port not available use 5000
    JWT_SECRET:process.env.JWT_SECRET,
    NODE_ENV:process.env.NODE_ENV,
    TMDB_API_KEY:process.env.TMDB_API_KEY,
    STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY
}