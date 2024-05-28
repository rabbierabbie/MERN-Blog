import express from 'express';
import {verifyToken} from '../utils/verifyUser.js';
import { create, getposts } from '../controllers/post.controller.js';

const router=express.Router();

router.post('/create',verifyToken,create);
router.get('/getposts',getposts); //no verification of token required as anyone can see the posts.
export default router;
