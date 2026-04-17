import express from 'express';
import healthRoutes from './routes/healthRoutes';
import billingRoutes from './routes/billingRoutes';

const app = express();

app.use(express.json());

app.use('/', healthRoutes);
app.use('/', billingRoutes);

export default app;
