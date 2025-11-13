import express from 'express';
import { signup ,Login ,Logout,updateProfile} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();
router.post('/signup',signup );
router.post('/Login', Login);
router.post('/Logout', Logout);
router.put('/update-profile',protectRoute, updateProfile);
router.get('/check',protectRoute,(req,res,)=> {res.status(200).json(req.user)});

export default router;
