import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';

export async function createRoutine(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  res.status(201).json({ message: 'Routine created (stub)' });
}

export async function getRoutines(
  req: Request,
  res: Response
): Promise<void> {
  res.status(200).json([]);
}
