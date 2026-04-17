import express from 'express';
import healthRoutes from './routes/healthRoutes';
import cartRoutes from './routes/cartRoutes';

const app = express();

app.use(express.json());

app.use('/', healthRoutes);
app.use('/', cartRoutes);

export default app;
