import 'dotenv/config';
import app from './app';
import pool from './services/db';

const PORT = process.env.PORT ?? 3001;

const start = async (): Promise<void> => {
  try {
    await pool.query('SELECT 1');
    console.log('PostgreSQL connected');
  } catch (err) {
    console.error('PostgreSQL connection failed:', err);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`user-service running on port ${PORT}`);
  });
};

start();
