// Application entry point
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import dbConfig from './config';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const databaseUrl = process.env.DATABASE_URL || dbConfig[env].dbUrl;

// connect to database
mongoose.connect(databaseUrl, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', err => console.log(err));

db.once('open', () => {
  console.log('Database connection established');
});

// Setup app port
const port = parseInt(process.env.PORT, 10) || 3000;

// start server
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
});
