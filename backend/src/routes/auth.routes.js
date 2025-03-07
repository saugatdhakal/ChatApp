import express from 'express';
import {signup,login,logout,checkAuth} from '../controllers/auth.controller.js';
import {updateProfile} from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// AUTH
router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);
router.get("/check",protectRoute,checkAuth);

//User
router.put("/update-profile",protectRoute,updateProfile);


export default router;
