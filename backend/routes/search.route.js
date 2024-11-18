import express from 'express'
import { searchPerson, searchMovie,searchTV,getSearchHistory,removeItemFromSearchHistory } from '../controllers/search.controllers.js';


const router=express.Router();
//this is for searhing and getting results
router.get("/person/:query",searchPerson)
router.get("/movie/:query",searchMovie)
router.get("/tv/:query",searchTV)


//this is for gettign search histories and being able to delete them
router.get("/history",getSearchHistory)
router.delete("/history/:id", removeItemFromSearchHistory)


export default router;