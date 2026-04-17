import pool from '../services/db';

export interface Cart {
  id: number;
  user_id: number;
  routine_id: number;
  status: string;
  created_at: Date;
}

export async function createCartsTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS carts (
      id          SERIAL PRIMARY KEY,
      user_id     INTEGER NOT NULL,
      routine_id  INTEGER NOT NULL,
      status      VARCHAR(50) NOT NULL DEFAULT 'pending',
      created_at  TIMESTAMP DEFAULT NOW()
    )
  `);
}
