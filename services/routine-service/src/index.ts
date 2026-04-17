import 'dotenv/config';
import app from './app';
import pool from './services/db';
import { createRoutinesTable } from './models/routineModel';

const PORT = process.env.PORT ?? 3002;

const start = async (): Promise<void> => {
  try {
    await pool.query('SELECT 1');
    console.log('PostgreSQL connected');
    await createRoutinesTable();
    console.log('routines table ready');
  } catch (err) {
    console.error('PostgreSQL connection failed:', err);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`routine-service running on port ${PORT}`);
  });
};

start();
