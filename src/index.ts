import express from 'express';
import routes from './routes/index';

const app = express();
const port = 5000;

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Connected!');
});

app.listen(port, () =>
  console.log(`server started on http://localhost:${port}`)
);

export default app;
