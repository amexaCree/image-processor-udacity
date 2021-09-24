import supertest from 'supertest';
import app from '../app';
const request = supertest(app);

describe('server connection - endpoints', () => {
  it('should visit / route successfully', (done) => {
    request.get('/').then((response) => {
      expect(response.status).toBe(200);
      done();
    });
  });

  it('should visit /api route successfully', (done) => {
    request.get('/api').then((response) => {
      expect(response.status).toBe(200);
      done();
    });
  });

  it('should visit /api/images route successfully', (done) => {
    request.get('/api/images').then((response) => {
      expect(response.status).toBe(200);
      done();
    });
  });
});
