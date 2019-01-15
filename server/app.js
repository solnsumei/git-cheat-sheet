import express from 'express';
import bodyParser from 'body-parser';

// Set up express app
const app = express();

// Add body parser middleware to parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add default route
app.get('/', (req, res) => res.send('It works'));

export default app;