import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';

export async function getSubscription(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  res.status(200).json({ plan: 'free', status: 'active' });
}
