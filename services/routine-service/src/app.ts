import express from 'express';
import healthRoutes from './routes/healthRoutes';
import routineRoutes from './routes/routineRoutes';

const app = express();

app.use(express.json());

app.use('/', healthRoutes);
app.use('/', routineRoutes);

export default app;
