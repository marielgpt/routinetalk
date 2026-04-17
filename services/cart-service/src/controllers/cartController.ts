import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';

export async function buildCart(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const { routineId } = req.body;

  if (!routineId) {
    res.status(400).json({ error: 'routineId is required' });
    return;
  }

  res.status(202).json({ message: 'Cart build queued' });
}
