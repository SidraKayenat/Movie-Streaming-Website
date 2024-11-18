import express from 'express'
import {getTrendingtv ,gettvTrailers,gettvDetails,getSimiliartv,gettvByCategory} from '../controllers/tv.controllers.js';


const router=express.Router();
router.get("/trending",getTrendingtv)
router.get("/:id/trailers",gettvTrailers) // the id is used to speicify whcih movie ke trailers the one you selected uskii id  ajaigi here 
router.get("/:id/details",gettvDetails)
router.get("/:id/similiar",getSimiliartv)
router.get("/:category",gettvByCategory) //categories are : top-rated , now popular and

export default router;