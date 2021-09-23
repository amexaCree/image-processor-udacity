import express from 'express';
import sharp from 'sharp';
import isEmpty from 'lodash.isempty';
import fs from 'fs';
import { getInputPath, getOutputPath, outputDir } from '../utilities/imgPaths';
import { getImageQueryParams } from '../utilities/imgQLib';
import { cacheImageSrc } from './cache';

// Creates transformed image and saves it to thumb images directory
const transformImage = (
  name: string,
  width: number | null,
  height: number | null
): Promise<unknown> => {
  const input = getInputPath(name);
  const output = getOutputPath(name);

  // safe guard if thumbs directory gets deleted
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    sharp(input)
      .resize(width, height)
      .toFile(output, (err) => {
        if (err) {
          reject(err);
        }
        resolve(output);
      });
  });
};

// transform image middleware
const transform = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  // if no query parameters exit middleware
  if (isEmpty(req.query)) {
    return next();
  }

  ['filename', 'width', 'height'].map((item) => {
    if (isEmpty(req.query[item])) {
      throw `Query Error: ${item} parameter missing from query.`;
    }
  });

  // collect and process image query parameters
  const [name, width, height] = getImageQueryParams([
    req.query.filename as string,
    req.query.width as string,
    req.query.height as string
  ]);

  // create resized thumb image and save thumb image path in cache
  transformImage(name, width, height)
    .then(
      (filepath) => {
        cacheImageSrc(req.originalUrl || req.url, filepath as string);
        res.sendFile(filepath as string);
      },
      (err: Error) => {
        next(`Sharp Error: ${err.message}`);
      }
    )
    .catch((err: Error) => {
      // display any error to user in browser
      next(`Send File Error: ${err.message}`);
    });
};

export { transformImage };
export default transform;
