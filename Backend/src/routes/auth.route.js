import express from 'express';
import { signup ,Login ,Logout} from '../controllers/auth.controller.js';
const router = express.Router();
router.post('/signup',signup )
router.post('/Login', Login)
router.post('/Logout', Logout)
export default router;