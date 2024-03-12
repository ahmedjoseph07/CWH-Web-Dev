import express from 'express';
import authController from '../controllers/authControl';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authController.profile);
router.put('/profile', authController.updateProfile);

export default router;