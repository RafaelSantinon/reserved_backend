import 'reflect-metadata';
import express from 'express';

// eslint-disable-next-line
import './database';

const app = express();

app.get('/', (req, res) => res.json({ message: 'Hello world!' }));

app.listen(3333, () => {
  /* eslint-disable no-console */
  console.log('Server is running!!');
});
