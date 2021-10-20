import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import cors from 'cors';
import './database';
import routes from './routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof Error) {
    return response.status(400).json({ error: error.message });
  }
  return response.status(500).json({ status: 'Error', message: 'Internal Server Error' });
});

app.listen(3000, () => console.log('Server is running on port 3000...'));
