import express from 'express';

const app = express();

app.get('/', (req, res) => res.json({ message: 'Hello world!' }));

app.listen(3333, () => {
  /* eslint-disable no-console */
  console.log('Server is running!!');
});
