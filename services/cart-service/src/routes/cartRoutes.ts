import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { buildCart } from '../controllers/cartController';

const router = Router();

router.post('/cart/build', requireAuth, buildCart);

export default router;
