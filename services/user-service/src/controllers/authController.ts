import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { registerUser, loginUser } from '../services/userService';
import { findUserById } from '../models/userModel';

const JWT_EXPIRY = '7d';

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set');
  return secret;
}

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

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'email and password are required' });
    return;
  }

  try {
    const user = await loginUser(email, password);
    const token = jwt.sign(
      { userId: user.id, email: user.email, userType: user.user_type },
      getJwtSecret(),
      { expiresIn: JWT_EXPIRY, algorithm: 'HS256' }
    );
    res.status(200).json({ token });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'INVALID_CREDENTIALS') {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function me(req: Request, res: Response): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid Authorization header' });
    return;
  }

  const token = authHeader.slice(7);

  try {
    const payload = jwt.verify(token, getJwtSecret()) as {
      userId: number;
      email: string;
      userType: string;
    };

    const user = await findUserById(payload.userId);
    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({
      id: user.id,
      email: user.email,
      userType: user.user_type,
    });
  } catch (err: unknown) {
    if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }
    console.error('Me error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
