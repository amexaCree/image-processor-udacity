import express from 'express';
import routes from './routes/index';

const app = express();

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Welcome to image processor!');
});

export default app;
