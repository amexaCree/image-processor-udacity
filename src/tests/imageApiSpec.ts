import { promises as fspromises } from 'fs';
import { getOutputPath } from '../utilities/imagePathBuilder';
import supertest from 'supertest';
import app from '../app';
// import { transformImage } from '../utilities/imageProcessing';

const request = supertest(app);

describe('image processing api', () => {
  // test image name + size properties for thumb
  const imgProps = {
    name: 'test',
    width: 101,
    height: 200
  };

  beforeAll((done) => {
    const thumbPath = getOutputPath(
      imgProps.name,
      imgProps.width,
      imgProps.height
    );
    fspromises.rm(thumbPath).then(() => {
      done();
    });
  });

  it('should query /api/images route with image name, width and height successfully', (done) => {
    request
      .get(
        `/api/images?filename=${imgProps.name}&width=${imgProps.width}&height=${imgProps.height}`
      )
      .then((response) => {
        // console.log(response);
        expect(response.status).toEqual(200);
        done();
      });
  });

  it('should have created thumb image correctly', (done) => {
    const thumbPath = getOutputPath(
      imgProps.name,
      imgProps.width,
      imgProps.height
    );
    fspromises.access(thumbPath).then(
      () => {
        done();
      },
      (err) => {
        expect(err).toBeFalsy();
        done();
      }
    );
  });

  it('should throw error for invalid height or width query param', (done) => {
    imgProps.width = 102;
    request
      .get(
        `/api/images?filename=${imgProps.name}&width=${imgProps.width}&height=test`
      )
      .then((response) => {
        expect(response.status).not.toEqual(200);
        done();
      });
  });

  it('should throw error if any query param is missing', (done) => {
    imgProps.width = 103;
    request
      .get(`/api/images?filename=${imgProps.name}&width=${imgProps.width}`)
      .then((response) => {
        expect(response.status).not.toEqual(200);
        done();
      });
  });

  it("should throw error if image doesn't exist", (done) => {
    imgProps.name = 'test2';
    imgProps.width = 200;
    imgProps.height = 300;
    request
      .get(
        `/api/images?filename=${imgProps.name}&width=${imgProps.width}&height=${imgProps.height}`
      )
      .then((response) => {
        expect(response.status).not.toEqual(200);
        done();
      });
  });
});
