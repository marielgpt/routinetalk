import 'dotenv/config';
import app from './app';
import pool from './services/db';
import { createCartsTable } from './models/cartModel';

const PORT = process.env.PORT ?? 3003;

const start = async (): Promise<void> => {
  try {
    await pool.query('SELECT 1');
    console.log('PostgreSQL connected');
    await createCartsTable();
    console.log('carts table ready');
  } catch (err) {
    console.error('PostgreSQL connection failed:', err);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`cart-service running on port ${PORT}`);
  });
};

start();
