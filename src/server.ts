import 'reflect-metadata';
import express, { Request, Response } from 'express';
import 'express-async-errors';

import { Constants } from './utils/constants';
import { routes } from './routes';

// eslint-disable-next-line
import './database';

const app = express();

app.use(express.json());

app.use(routes);

app.use((err: Error, req: Request, res: Response) => {
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

app.get('/', (req, res) => res.json({ message: 'Hello world!' }));

app.listen(Constants.port, () => {
  /* eslint-disable no-console */
  console.log(`Server is running - PORT: ${Constants.port}!!!`);
});
