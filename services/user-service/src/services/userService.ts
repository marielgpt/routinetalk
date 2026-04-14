import bcrypt from 'bcryptjs';
import { findUserByEmail, insertUser, User } from '../models/userModel';

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
