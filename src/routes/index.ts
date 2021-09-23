import express from 'express';
import images from './api/images';

const routes = express.Router();

routes.use('/images', images);

routes.get('/', (req, res) => {
  res.send('this is the api route');
});

export default routes;
