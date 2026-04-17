import { Request, Response } from 'express';

export async function sendNotification(
  req: Request,
  res: Response
): Promise<void> {
  const { userId, type, message } = req.body;

  if (!userId || !type || !message) {
    res.status(400).json({ error: 'userId, type, and message are required' });
    return;
  }

  res.status(202).json({ message: 'Notification queued' });
}
