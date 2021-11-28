import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import 'express-async-errors';

import { Constants } from './utils/constants';
import { routes } from './routes';

// eslint-disable-next-line
import './database';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

// eslint-disable-next-line no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(Constants.port, () => {
  /* eslint-disable no-console */
  console.log(`Server is running - PORT: ${Constants.port}!!!`);
});
