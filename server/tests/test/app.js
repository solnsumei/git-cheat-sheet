import request from 'supertest';
import bcrypt from 'bcrypt';
import assert from 'assert';
import app from '../../devServer';

// Test App
describe('App', () => {
  describe('App routes', () => {
    it('responds with a 200 with content', (done) => {
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });
  });

  describe('Failed routes', () => {
    it('responds with a 404 with route route not found', (done) => {
      request(app)
        .get('/api/v1/not-found')
        .set('Accept', 'application/json')
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.error.message, 'Route does not exist');
          done();
        });
    });

    it('responds with a 400 bad request, route not found', (done) => {
      request(app)
        .post('/api/v1/any-other-route')
        .send({})
        .set('Accept', 'application/json')
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.error.message, 'Route does not exist');
          done();
        });
    });
  });
});