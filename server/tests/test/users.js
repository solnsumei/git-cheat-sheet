// Import the required files and classes for test
import request from 'supertest';
import bcrypt from 'bcrypt';
import assert from 'assert';
import app from '../../devServer';
import User from '../../models/User';
import { users } from '../mockData';

// Test user sign up route
describe('User', () => {

  let admin = { ...users.admin };
  admin.password = bcrypt.hashSync(admin.password, 10);
  const { newUser } = users;

  before((done) => {
    User.create(admin, (err, admin) => {
      process.stdout.write('Test admin created \n');
      done();
    });
  });

  // User signup test
  describe('POST /api/v1/signup', () => {
    describe('POST Validation Errors /api/users/signup', () => {
      it('responds with a 400 bad request for empty body', (done) => {
        request(app)
          .post('/api/v1/signup')
          .send({})
          .set('Accept', 'application/json')
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.error.message, 'All fields cannot be empty');
            done();
          });
      });

      it('responds with a 400 bad request, invalid email and name', (done) => {
        request(app)
          .post('/api/v1/signup')
          .send({ name: '', email: 'hello@you', password: 'solomon1' })
          .set('Accept', 'application/json')
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.error.name, 'Field is required');
            assert.equal(res.body.error.email, 'Email is invalid');
            done();
          });
      });

      it('responds with a 400 bad request, empty email and name less than 3', (done) => {
        request(app)
          .post('/api/v1/signup')
          .send({ name: 'abrhshhsjs', email: '', password: 'ghsgs' })
          .set('Accept', 'application/json')
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.error.email, 'Field is required');
            assert.equal(res.body.error.password, 'Field cannot be less than 6 chars');
            done();
          });
      });
    });

    describe('POST Sign Up user /api/users/signup', () => {

      it('responds with a 201 with created user', (done) => {
        request(app)
          .post('/api/v1/signup')
          .send(newUser)
          .set('Accept', 'application/json')
          .end((err, res) => {
            assert.equal(res.status, 201);
            assert.equal(res.body.message, 'Sign up successful');
            assert.equal(res.body.user.name, newUser.name);
            newUser._id = res.body.user._id;
            newUser.token = res.body.token;
            done();
          });
      });
    });

    describe('POST Duplicate email /api/v1/signup', () => {

      it('responds with a 422 with error message', (done) => {
        request(app)
          .post('/api/v1/signup')
          .send(admin)
          .set('Accept', 'application/json')
          .end((err, res) => {
            assert.equal(res.status, 422);
            assert.equal(res.body.error.message, 'Sign up failed. User with this email aready exists.');
            done();
          });
      });
    });

  });

  // User Log in test
  describe('POST /api/v1/login', () => {
    it('responds with a 400 status and username and password required', (done) => {
      request(app)
        .post('/api/v1/login')
        .send({})
        .set('Accept', 'application/json')
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error.message, 'All fields cannot be empty');
          done();
        });
    });

    it('responds with a 400 status and invalid email and password', (done) => {
      request(app)
        .post('/api/v1/login')
        .send({ email: 'solking24@gmail', password: 'solom' })
        .set('Accept', 'application/json')
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error.email, 'Email is invalid');
          assert.equal(res.body.error.password, 'Field cannot be less than 6 chars');
          done();
        });
    });

    it('responds with a 401 status and user not found error', (done) => {
      request(app)
        .post('/api/v1/login')
        .send({ email: 'solking24@gmail.com', password: 'solomon1' })
        .set('Accept', 'application/json')
        .end((err, res) => {
          assert.equal(res.status, 401);
          assert.equal(res.body.error.message, 'Username and/or password is incorrect');
          done();
        });
    });

    it('responds with a 200 status and success message and user token', (done) => {
      request(app)
        .post('/api/v1/login')
        .send({ email: admin.email, password: users.admin.password })
        .set('Accept', 'application/json')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, `Welcome back ${admin.name}`);
          assert.equal(res.body.user.email, admin.email);
          done();
        });
    });
  });

  after((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });

});