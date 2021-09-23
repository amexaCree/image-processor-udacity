import {
  cacheImageSrc,
  getImageCacheKey,
  getCacheData
} from '../utilities/cache';

describe('cache methods', () => {
  const url = '/api/images?filename=test&width=400&height=200';
  const imageCacheKey = '__imgCache__' + url;
  const imageFilePath = 'assets/thumb/test_thumb.jpg';

  it('should return cache key', () => {
    expect(getImageCacheKey(url)).toEqual(imageCacheKey);
  });

  it('should cache file name for thumb image', () => {
    cacheImageSrc(url, imageFilePath);
    expect(getCacheData(imageCacheKey)).toEqual(imageFilePath);
  });
});
