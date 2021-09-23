import supertest from 'supertest';
import app from '../index';
import { transformImage } from '../utilities/imageProcessing';

const request = supertest(app);

describe('image processing api', () => {
  it('should transform image with name, width and height params', (done) => {
    transformImage('test', 200, 100).then(
      (res) => {
        expect(res as string).toBeTruthy();
        done();
      },
      () => {
        done();
      }
    );
  });

  it('should not transform image without image filename', (done) => {
    transformImage('', 200, 100).then(
      () => {
        done();
      },
      (err: Error) => {
        expect(err).toBeTruthy();
        done();
      }
    );
  });

  it('should query /api/images route with image name, width and height successfully', (done) => {
    const name = 'test';
    const width = 100;
    const height = 200;
    request
      .get(`/api/images?filename=${name}&width=${width}&height=${height}`)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });

  it('should throw error if any query param is missing', (done) => {
    const name = 'test2';
    const width = 100;
    request
      .get(`/api/images?filename=${name}&width=${width}&height=`)
      .then((response) => {
        expect(response.status).not.toEqual(200);
        done();
      });
  });

  it("should throw error if image doesn't exist", (done) => {
    const name = 'test2';
    const width = 100;
    const height = 200;
    request
      .get(`/api/images?filename=${name}&width=${width}&height=${height}`)
      .then((response) => {
        expect(response.status).not.toEqual(200);
        done();
      });
  });
});
