import express from 'express'
import { getMoreInfo } from '../controllers/moreinfo.controller.js';
const router=express.Router();

router.get('/:type/:id', getMoreInfo);

export default router;