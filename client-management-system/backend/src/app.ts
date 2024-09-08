import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from './config/database';
import clientRoutes from './routes/clientRoutes';
import errorHandler from './utils/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/clients', clientRoutes);

app.use(errorHandler);

initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(error => {
  console.error('Failed to initialize database:', error);
  process.exit(1);
});

export default app;