import express from 'express';
import {
  deleteUser,
    getusers,
    signout,
    updateUser,
  } from '../controllers/user.controller.js';
  import { verifyToken } from '../utils/verifyUser.js';
import { test } from '../controllers/user.controller.js'; // notice the two dots here and the .js here

const router=express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId',verifyToken,deleteUser);
router.post('/signout', signout); //no use of id as anybody can sign out and no need to verifyuser too.
router.get('/getusers', verifyToken, getusers);

export default router;