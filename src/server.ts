import 'reflect-metadata';
import express from 'express';

import { Constants } from './utils/constants';
import { routes } from './routes';

// eslint-disable-next-line
import './database';

const app = express();

app.use(express.json());

app.use(routes);

app.get('/', (req, res) => res.json({ message: 'Hello world!' }));

app.listen(Constants.port, () => {
  /* eslint-disable no-console */
  console.log(`Server is running - PORT: ${Constants.port}!!!`);
});
