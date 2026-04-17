import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { getSubscription } from '../controllers/billingController';

const router = Router();

router.get('/billing/subscription', requireAuth, getSubscription);

export default router;
