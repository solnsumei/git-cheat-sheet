import express from 'express';
import bodyParser from 'body-parser';

import router from './router/index';

// Set up express app
const app = express();

// Add body parser middleware to parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', router);

// Add default route
app.get('/', (req, res) => res.send('It works'));

export default app;
