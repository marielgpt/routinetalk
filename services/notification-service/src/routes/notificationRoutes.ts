import { Router } from 'express';
import { sendNotification } from '../controllers/notificationController';

const router = Router();

router.post('/notifications/send', sendNotification);

export default router;
