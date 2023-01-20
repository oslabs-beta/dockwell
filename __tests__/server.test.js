const server = require('../server/server');
const request = require('supertest');
// import app from '../src/client/pages/App';

//test ideas: tests for all our server routes
//  middleware tests
//
// const server = 'http://localhost:3535';

describe('Route integration', () => {
  describe('GET requests', () => {
    it('responds with 200 status and text/html content type', () => {
      return request(server)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200);
    });

    it('responds with 200 status and text/html content type', () => {
      return request(server)
        .get('/getStats')
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });
  });
});
