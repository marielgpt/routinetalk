import express from 'express';
import healthRoutes from './routes/healthRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(express.json());

app.use('/', healthRoutes);
app.use('/', authRoutes);

export default app;
