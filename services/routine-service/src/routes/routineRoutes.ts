import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { createRoutine, getRoutines } from '../controllers/routineController';

const router = Router();

router.get('/routines', getRoutines);
router.post('/routines', requireAuth, createRoutine);

export default router;
