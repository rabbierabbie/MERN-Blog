import express from 'express';
import {
    updateUser,
  } from '../controllers/user.controller.js';
  import { verifyToken } from '../utils/verifyUser.js';
import { test } from '../controllers/user.controller.js'; // notice the two dots here and the .js here

const router=express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);

export default router;