import pool from '../services/db';

export interface Subscription {
  id: number;
  user_id: number;
  plan: string;
  status: string;
  created_at: Date;
}

export async function createSubscriptionsTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id         SERIAL PRIMARY KEY,
      user_id    INTEGER UNIQUE NOT NULL,
      plan       VARCHAR(50) NOT NULL DEFAULT 'free',
      status     VARCHAR(50) NOT NULL DEFAULT 'active',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
}
