import 'dotenv/config';
import app from './app';
import pool from './services/db';
import { createNotificationsTable } from './models/notificationModel';

const PORT = process.env.PORT ?? 3004;

const start = async (): Promise<void> => {
  try {
    await pool.query('SELECT 1');
    console.log('PostgreSQL connected');
    await createNotificationsTable();
    console.log('notifications table ready');
  } catch (err) {
    console.error('PostgreSQL connection failed:', err);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`notification-service running on port ${PORT}`);
  });
};

start();
