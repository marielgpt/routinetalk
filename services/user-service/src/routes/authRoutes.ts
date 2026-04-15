import { Router } from 'express';
import { register, login, me } from '../controllers/authController';

const router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/me', me);

export default router;
