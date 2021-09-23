import express from 'express';
import cache from '../../utilities/cache';
import transform from '../../utilities/transform';

const images = express.Router();

// eslint-disable-next-line @typescript-eslint/no-empty-function
images.get('/', cache, transform, (req, res) => {
  res.send('this is the images api route');
});

export default images;
