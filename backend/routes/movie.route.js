import express from 'express'
import { getTrendingMovie,getMovieTrailers,getMovieDetails,getSimiliarMovies,getMoviesByCategory } from '../controllers/movie.controllers.js';


const router=express.Router();
router.get("/trending",getTrendingMovie)
router.get("/:id/trailers",getMovieTrailers) // the id is used to speicify whcih movie ke trailers the one you selected uskii id  ajaigi here 
router.get("/:id/details",getMovieDetails)
router.get("/:id/similiar",getSimiliarMovies)
router.get("/:category",getMoviesByCategory) //categories are : top-rated , now popular and

export default router;