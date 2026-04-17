import pool from '../services/db';

export interface Notification {
  id: number;
  user_id: number;
  type: string;
  message: string;
  status: string;
  created_at: Date;
}

export async function createNotificationsTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notifications (
      id         SERIAL PRIMARY KEY,
      user_id    INTEGER NOT NULL,
      type       VARCHAR(50) NOT NULL,
      message    TEXT NOT NULL,
      status     VARCHAR(50) NOT NULL DEFAULT 'queued',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
}
