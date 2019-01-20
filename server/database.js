// Application entry point
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dbConfig from './config';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

const databaseUrl = process.env.DATABASE_URL || dbConfig[env].dbUrl;

mongoose.connect(databaseUrl, { useCreateIndex: true, useNewUrlParser: true });

const db = mongoose.connection;

if (env === 'development') {
  db.on('error', err => console.log(err));

  db.once('open', () => {
    console.log('Database connection established');
  });
}
