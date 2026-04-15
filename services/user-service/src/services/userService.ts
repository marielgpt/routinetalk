import bcrypt from 'bcryptjs';
import { findUserByEmail, insertUser, User } from '../models/userModel';

export async function loginUser(
  email: string,
  password: string
): Promise<User> {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    throw new Error('INVALID_CREDENTIALS');
  }

  return user;
}

const SALT_ROUNDS = 10;

export async function registerUser(
  email: string,
  password: string,
  userType: string
): Promise<User> {
  const existing = await findUserByEmail(email);
  if (existing) {
    throw new Error('EMAIL_TAKEN');
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  return insertUser(email, passwordHash, userType);
}
