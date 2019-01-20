import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    dbUrl: 'mongodb://localhost/cheatsheet-db'
  },
  test: {
    dbUrl: 'mongodb://localhost/cheatsheet-db-test'
  }
};

export default config;
