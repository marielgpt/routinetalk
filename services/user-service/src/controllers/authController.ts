import { Request, Response } from 'express';
import { registerUser } from '../services/userService';

export async function register(req: Request, res: Response): Promise<void> {
  const { email, password, userType } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'email and password are required' });
    return;
  }

  try {
    await registerUser(email, password, userType ?? 'general');
    res.status(201).json({ message: 'User created' });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'EMAIL_TAKEN') {
      res.status(400).json({ error: 'Email already registered' });
      return;
    }
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
