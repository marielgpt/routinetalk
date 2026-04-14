import pool from '../services/db';

export interface User {
  id: number;
  email: string;
  password_hash: string;
  user_type: string;
  created_at: Date;
}

export async function createUsersTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id          SERIAL PRIMARY KEY,
      email       VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      user_type   VARCHAR(50) NOT NULL,
      created_at  TIMESTAMP DEFAULT NOW()
    )
  `);
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await pool.query<User>(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0] ?? null;
}

export async function insertUser(
  email: string,
  passwordHash: string,
  userType: string
): Promise<User> {
  const result = await pool.query<User>(
    `INSERT INTO users (email, password_hash, user_type)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [email, passwordHash, userType]
  );
  return result.rows[0];
}
