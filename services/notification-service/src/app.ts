import express from 'express';
import healthRoutes from './routes/healthRoutes';
import notificationRoutes from './routes/notificationRoutes';

const app = express();

app.use(express.json());

app.use('/', healthRoutes);
app.use('/', notificationRoutes);

export default app;
