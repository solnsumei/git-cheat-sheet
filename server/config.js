import dotenv from 'dotenv';

dotenv.config();

const config = {
  production: {
    dbUrl: process.env.DATABASE_URL
  },
  development: {
    dbUrl: 'mongodb://localhost/cheatsheet-db'
  },
  test: {
    dbUrl: 'mongodb://localhost/cheatsheet-db-test'
  }
};

export default config;
