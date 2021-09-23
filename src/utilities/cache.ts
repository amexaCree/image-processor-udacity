import express from 'express';
import nodeCache from 'node-cache';

const cache = new nodeCache();
const cachedImageDuration = 80;

const getCacheData = (key: string): string | undefined => {
  return cache.get(key);
};

const setCacheData = (key: string, content: string, duration: number): void => {
  cache.set(key, content, duration * 1000);
};

const getImageCacheKey = (url: string): string => {
  return '__imgCache__' + url;
};

// cache thumb image file path with url key
const cacheImageSrc = (url: string, filepath: string): void => {
  const key = getImageCacheKey(url);
  setCacheData(key, filepath, cachedImageDuration);
};

// serve image from cache middleware
const getCachedImage = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const key = getImageCacheKey(req.originalUrl || req.url) as string;
  const imageFilePath = getCacheData(key) as string;
  if (imageFilePath) {
    res.sendFile(imageFilePath, (err) => {
      if (err) {
        next(`Cache Error: ${err.message}`);
      }
    });
  } else {
    next();
  }
};

export default getCachedImage;
export { getCacheData, setCacheData, cacheImageSrc, getImageCacheKey };
