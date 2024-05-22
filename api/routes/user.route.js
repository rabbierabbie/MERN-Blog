import express from 'express';
import { test } from '../controllers/user.controller.js'; // notice the two dots here and the .js here

const router=express.Router();

router.get('/test',test);

export default router;