import 'dotenv/config';
import app from './app';
import pool from './services/db';
import { createSubscriptionsTable } from './models/subscriptionModel';

const PORT = process.env.PORT ?? 3005;

const start = async (): Promise<void> => {
  try {
    await pool.query('SELECT 1');
    console.log('PostgreSQL connected');
    await createSubscriptionsTable();
    console.log('subscriptions table ready');
  } catch (err) {
    console.error('PostgreSQL connection failed:', err);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`billing-service running on port ${PORT}`);
  });
};

start();
