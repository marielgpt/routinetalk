import pool from '../services/db';

export interface Routine {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  created_at: Date;
}

export async function createRoutinesTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS routines (
      id          SERIAL PRIMARY KEY,
      user_id     INTEGER NOT NULL,
      title       VARCHAR(255) NOT NULL,
      description TEXT,
      created_at  TIMESTAMP DEFAULT NOW()
    )
  `);
}
