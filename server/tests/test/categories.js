// Import the required files and classes for test
import request from 'supertest';
import assert from 'assert';
import bcrypt from 'bcrypt';
import app from '../../devServer';
import User from '../../models/User';
import Category from '../../models/Category';
import Command from '../../models/Command';
import { users, categories, commands, invalid, invalidData } from '../mockData';

// Test add book route
describe('Category & Commands Routes', () => {
  const admin = { ...users.admin };
  const user = { ...users.user };

  const category1 = { ...categories.category1 };
  const category2 = { ...categories.category2 };

  const command1 = { ...commands.command1 };
  const command2 = { ...commands.command2 };
  const command3 = { ...commands.command3 };

  const hashedPassword = bcrypt.hashSync(admin.password, 10);

  before((done) => {
    User.create({ name: admin.name, email: admin.email,
      password: hashedPassword, isAdmin: true}, (err, adminRes) => {
      process.stdout.write('Test admin created \n');
        request(app)
          .post('/api/v1/signup')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, userRes) => {
            user.token = userRes.body.token;
            user._id = userRes.body.user._id;
            request(app)
              .post('/api/v1/login')
              .send({ email: admin.email, password: admin.password })
              .set('Accept', 'application/json')
              .end((err, res) => {
                admin.token = res.body.token;
                admin._id = res.body.user._id;
                process.stdout.write('Test users created \n');
                done();
              });
          });
    });
    
  });

  describe('GET Ordinary users categories route /api/v1/categories', () => {
    describe('GET categories without being logged in', () => {
      it('it should respond with a 200', (done) => {
        request(app)
          .get('/api/v1/categories')
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/, done);
      });
    });
  });

  describe('POST Add category /api/v1/categories', () => {
    describe('POST try to add a category without being logged in', () => {
      it('it should respond with a 401 with access denied please log in error message', (done) => {
        request(app)
          .post('/api/v1/categories')
          .set('Accept', 'application/json')
          .send(category1)
          .end((err, res) => {
            assert.equal(res.status, 401);
            assert.equal(res.body.error.message, 'Access denied, please login');
            done();
          });
      });

      it('it should respond with a 401 with access denied token not authenticated', (done) => {
        request(app)
          .post('/api/v1/categories')
          .set('Accept', 'application/json')
          .set('auth-token', "hyssgsheejhusssy234558393")
          .send(category1)
          .end((err, res) => {
            assert.equal(res.status, 401);
            assert.equal(res.body.error.message, 'Access denied, token could not be authenticated');
            done();
          });
      });
    });

    describe('POST add category when ordinary user has a valid token', () => {
      it('it should respond with a 403 with error message access denied, admins only', (done) => {
        request(app)
          .post('/api/v1/categories')
          .set('Accept', 'application/json')
          .set('auth-token', user.token)
          .send(category1)
          .end((err, res) => {
            assert.equal(res.status, 403);
            assert.equal(res.body.error.message, 'Access denied, admins only');
            done();
          });
      });
    });

    describe('POST add category when admin has a valid token', () => {
      it('it should respond with a 400 with errors', (done) => {
        request(app)
          .post('/api/v1/categories')
          .set('Accept', 'application/json')
          .set('auth-token', admin.token)
          .send({})
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.error.name, 'Field is required');
            done();
          });
      });

      it('it should respond with a 400 with category name length error', (done) => {
        request(app)
          .post('/api/v1/categories')
          .set('Accept', 'application/json')
          .set('auth-token', admin.token)
          .send(invalidData.category)
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.error.name, 'Field cannot be less than 3 chars');
            done();
          });
      });

      it('it should respond with a 201 with the category name', (done) => {
        request(app)
          .post('/api/v1/categories')
          .set('Accept', 'application/json')
          .set('auth-token', admin.token)
          .send(category1)
          .end((err, res) => {
            category1._id = res.body.category._id;
            assert.equal(res.status, 201);
            assert.equal(res.body.category.name, category1.name);
            done();
          });
      });

      it('it should respond with a 201 with the category name', (done) => {
        request(app)
          .post('/api/v1/categories')
          .set('Accept', 'application/json')
          .set('auth-token', admin.token)
          .send(category2)
          .end((err, res) => {
            category2._id = res.body.category._id;
            assert.equal(res.status, 201);
            assert.equal(res.body.category.name, category2.name);
            done();
          });
      });

      it('it should respond with a 422 with duplicate category name error', (done) => {
        request(app)
          .post('/api/v1/categories')
          .set('Accept', 'application/json')
          .set('auth-token', admin.token)
          .send(category1)
          .end((err, res) => {
            assert.equal(res.status, 422);
            assert.equal(res.body.error.message, 'Save failed. Category already exists.');
            done();
          });
      });
    });
  });

  describe('Fetch single category /api/v1/categories/:id', () => {
    it('it should respond with a 404 with category is not found', (done) => {
      request(app)
        .get('/api/v1/categories/whatsup')
        .set('Accept', 'application/json')
        .set('auth-token', admin.token)
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.error.message, 'Resource not found');
          done();
        });
    });

    it('it should respond with a 404 with category is not found', (done) => {
      request(app)
        .get('/api/v1/categories/fg2312bhsj12')
        .set('Accept', 'application/json')
        .set('auth-token', admin.token)
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.error.message, 'Resource not found');
          done();
        });
    });

    it('it should respond with a 200 with category', (done) => {
      request(app)
        .get(`/api/v1/categories/${category1._id}`)
        .set('Accept', 'application/json')
        .set('auth-token', admin.token)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.category.name, category1.name);
          done();
        });
    });
  })

  describe('PUT update category /api/v1/categories', () => {
    describe('PUT update category when admin has a valid token', () => {
      it('it should respond with a 404 with when category is not found', (done) => {
        request(app)
          .put('/api/v1/categories/whatsup')
          .set('Accept', 'application/json')
          .set('auth-token', admin.token)
          .send(category2)
          .end((err, res) => {
            assert.equal(res.status, 404);
            assert.equal(res.body.error.message, 'Resource not found');
            done();
          });
      });

      it('it should respond with a 400 with category name length error', (done) => {
        request(app)
          .put(`/api/v1/categories/${category1._id}`)
          .set('Accept', 'application/json')
          .set('auth-token', admin.token)
          .send(invalidData.category)
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.error.name, 'Field cannot be less than 3 chars');
            done();
          });
      });

      it('it should respond with a 422 with duplicate category name error', (done) => {
        request(app)
          .put(`/api/v1/categories/${category1._id}`)
          .set('Accept', 'application/json')
          .set('auth-token', admin.token)
          .send({ name: category2.name })
          .end((err, res) => {
            assert.equal(res.status, 422);
            assert.equal(res.body.error.message, 'Update failed. Category with name already exists.');
            done();
          });
      });

      it('it should respond with a 200 with the category name', (done) => {
        request(app)
          .put(`/api/v1/categories/${category1._id}`)
          .set('Accept', 'application/json')
          .set('auth-token', admin.token)
          .send({ name: 'Another Category'})
          .end((err, res) => {
            category1.name = res.body.category.name;
            assert.equal(res.status, 200);
            assert.equal(res.body.category.name, 'Another Category');
            done();
          });
      });
    });

  });

  describe('Commands Controller /api/v1/commands', () => {

    describe('POST Add commands /api/v1/commands', () => {
      describe('POST try to add a command without being logged in', () => {
        it('it should respond with a 401 with access denied please log in error message', (done) => {
          request(app)
            .post('/api/v1/commands')
            .set('Accept', 'application/json')
            .send(command1)
            .end((err, res) => {
              assert.equal(res.status, 401);
              assert.equal(res.body.error.message, 'Access denied, please login');
              done();
            });
        });

        it('it should respond with a 401 with access denied token not authenticated', (done) => {
          request(app)
            .post('/api/v1/commands')
            .set('Accept', 'application/json')
            .set('auth-token', "hyssgsheejhusssy234558393")
            .send(command1)
            .end((err, res) => {
              assert.equal(res.status, 401);
              assert.equal(res.body.error.message, 'Access denied, token could not be authenticated');
              done();
            });
        });
      });

      describe('POST add command when user has a valid token', () => {
        it('it should respond with a 400 with errors', (done) => {
          request(app)
            .post('/api/v1/commands')
            .set('Accept', 'application/json')
            .set('auth-token', admin.token)
            .send({})
            .end((err, res) => {
              assert.equal(res.status, 400);
              assert.equal(res.body.error.message, 'All fields cannot be empty');
              done();
            });
        });

        it('it should respond with a 400 with errors', (done) => {
          request(app)
            .post('/api/v1/commands')
            .set('Accept', 'application/json')
            .set('auth-token', admin.token)
            .send({ 
              snippet: 'gshhshkak akajjkshg shsjskksks ksksksjs hshshsbsbsbb sbsbsbsnn snsnssnns nsnnsnsnnsnsn nsnsnsns',
              action: 'ol',
            })
            .end((err, res) => {
              assert.equal(res.status, 400);
              assert.equal(res.body.error.snippet, 'Field cannot be more than 60 chars');
              assert.equal(res.body.error.action, 'Field cannot be less than 3 chars');
              assert.equal(res.body.error.category, 'Field is required');
              done();
            });
        });

        it('it should respond with a 400 with category errors', (done) => {
          request(app)
            .post('/api/v1/commands')
            .set('Accept', 'application/json')
            .set('auth-token', user.token)
            .send({
              snippet: command1.snippet,
              action: command1.action,
              category: 'fgshjsjjshjshgjshssj'
            })
            .end((err, res) => {
              assert.equal(res.status, 400);
              assert.equal(res.body.error.category, 'Category is invalid');
              done();
            });
        });

        it('it should respond with a 201 with the command 1 snippet', (done) => {
          command1.category= category1._id;
          request(app)
            .post('/api/v1/commands')
            .set('Accept', 'application/json')
            .set('auth-token', admin.token)
            .send(command1)
            .end((err, res) => {
              command1._id = res.body.command._id;
              assert.equal(res.status, 201);
              assert.equal(res.body.command.snippet, command1.snippet);
              done();
            });
        });

        it('it should respond with a 201 with the command2 snippet', (done) => {
          command2.category = category1._id;
          request(app)
            .post('/api/v1/commands')
            .set('Accept', 'application/json')
            .set('auth-token', user.token)
            .send(command2)
            .end((err, res) => {
              command2._id = res.body.command._id;
              assert.equal(res.status, 201);
              assert.equal(res.body.command.snippet, command2.snippet);
              done();
            });
        });

        it('it should respond with a 422 with duplicate command snippet error', (done) => {
          request(app)
            .post('/api/v1/commands')
            .set('Accept', 'application/json')
            .set('auth-token', admin.token)
            .send(command1)
            .end((err, res) => {
              assert.equal(res.status, 422);
              assert.equal(res.body.error.message, 'Save failed. Command with this snippet already exists.');
              done();
            });
        });
      });
    });

    describe('Search commands /api/v1/commands/search', () => {
      it('it should respond with a 200 with 2 command items in one catregory', (done) => {
        request(app)
          .post('/api/v1/commands/search')
          .set('Accept', 'application/json')
          .set('auth-token', admin.token)
          .send({ searchQuery: 'command' })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.categories.length, 1);
            assert.equal(res.body.categories[0].commands.length, 2)
            done();
          });
      });

      it('it should respond with a 200 with 1 command items in one catregory', (done) => {
        request(app)
          .post('/api/v1/commands/search')
          .set('Accept', 'application/json')
          .set('auth-token', admin.token)
          .send({ searchQuery: '1' })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.categories.length, 1);
            assert.equal(res.body.categories[0].commands.length, 1)
            done();
          });
      });

      it('it should respond with a 200 with no items', (done) => {
        request(app)
          .post('/api/v1/commands/search')
          .set('Accept', 'application/json')
          .set('auth-token', admin.token)
          .send({ searchQuery: 'xxx' })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.categories.length, 0);
            done();
          });
      });
    })

    describe('PUT update commands /api/v1/commands/:id', () => {
      it('it should respond with a 404 with when command is not found', (done) => {
        request(app)
          .put('/api/v1/commands/whatsup')
          .set('Accept', 'application/json')
          .set('auth-token', admin.token)
          .send(command1)
          .end((err, res) => {
            assert.equal(res.status, 404);
            assert.equal(res.body.error.message, 'Resource not found');
            done();
          });
      });

      it('it should respond with a 403 when user did not create command', (done) => {
        request(app)
          .put(`/api/v1/commands/${command1._id}`)
          .set('Accept', 'application/json')
          .set('auth-token', user.token)
          .send({ snippet: command3.snippet })
          .end((err, res) => {
            assert.equal(res.status, 403);
            assert.equal(res.body.error.message, 'You do not have permission to perform this operation');
            done();
          });
      });

      it('it should respond with a 422 with duplicate command snippet error', (done) => {
        request(app)
          .put(`/api/v1/commands/${command1._id}`)
          .set('Accept', 'application/json')
          .set('auth-token', admin.token)
          .send({ snippet: command2.snippet })
          .end((err, res) => {
            assert.equal(res.status, 422);
            assert.equal(res.body.error.message, 'Update failed. Command with snippet already exists.');
            done();
          });
      });

      it('it should respond with a 200 with the command snippet', (done) => {
        request(app)
          .put(`/api/v1/commands/${command1._id}`)
          .set('Accept', 'application/json')
          .set('auth-token', admin.token)
          .send({ snippet: 'another snippet' })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.command.snippet, 'another snippet');
            done();
          });
      });  
    });

    describe('DELETE command /api/v1/commands/:id', () => {

      describe('Delete command when user has an invalid commandId', () => {
        it('it should respond with a 400 with resource not found', (done) => {
          request(app)
            .delete('/api/v1/commands/hello')
            .set('Accept', 'application/json')
            .set('auth-token', admin.token)
            .end((err, res) => {
              assert.equal(res.status, 404);
              assert.equal(res.body.error.message, 'Resource not found');
              done();
            });
        });
      });

      describe('Delete command when user has a valid commandId', () => {
        it('it should respond with a 200 with message', (done) => {
          request(app)
            .delete(`/api/v1/commands/${command1._id}`)
            .set('Accept', 'application/json')
            .set('auth-token', admin.token)
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body.success, true);
              assert.equal(res.body.message, 'Command deleted successfully');
              done();
            });
        });
      });

      describe('Delete command when user tries to delete an unavailable command', () => {
        it('it should respond with a 404 with error command not found', (done) => {
          request(app)
            .delete(`/api/v1/commands/${command1._id}`)
            .set('Accept', 'application/json')
            .set('auth-token', admin.token)
            .end((err, res) => {
              assert.equal(res.status, 404);
              assert.equal(res.body.error.message, 'Resource not found');
              done();
            });
        });
      });
    });
  });

  describe('DELETE category /api/v1/categories', () => {

    describe('Delete category when admin has an invalid categoryId', () => {
      it('it should respond with a 400 with resource not found', (done) => {
        request(app)
          .delete('/api/v1/categories/hello')
          .set('Accept', 'application/json')
          .set('auth-token', admin.token)
          .end((err, res) => {
            assert.equal(res.status, 404);
            assert.equal(res.body.error.message, 'Resource not found');
            done();
          });
      });
    });

    describe('Delete category when admin has a valid categoryId but category has commands attached', () => {
      it('it should respond with a 422 with category has commands attached', (done) => {
        request(app)
          .delete(`/api/v1/categories/${category1._id}`)
          .set('Accept', 'application/json')
          .set('auth-token', admin.token)
          .end((err, res) => {
            assert.equal(res.status, 422);
            assert.equal(res.body.error.message, 'Category contains children and cannot be deleted');
            done();
          });
      });
    });

    describe('Delete category when admin has a valid categoryId', () => {
      it('it should respond with a 200 with message', (done) => {
        request(app)
          .delete(`/api/v1/categories/${category2._id}`)
          .set('Accept', 'application/json')
          .set('auth-token', admin.token)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.success, true);
            assert.equal(res.body.message, 'Category deleted successfully');
            done();
          });
      });
    });

    describe('Delete category when admin tries to delete an unavailable category', () => {
      it('it should respond with a 404 with error category not found', (done) => {
        request(app)
          .delete(`/api/v1/categories/hshshshshshs`)
          .set('Accept', 'application/json')
          .set('auth-token', admin.token)
          .end((err, res) => {
            assert.equal(res.status, 404);
            assert.equal(res.body.error.message, 'Resource not found');
            done();
          });
      });
    });
  });

  after((done) => {
    User.deleteMany({}, (err) => {
      Category.deleteMany({}, (err) => {
        Command.deleteMany({}, (err) => {
          done();
        });
      });
    });
  });
});