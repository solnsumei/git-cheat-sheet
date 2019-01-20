import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import './database';
import router from './router/index';

const port = parseInt(process.env.PORT, 10) || 8000;

// Set up express app
const app = express();
process.env.NODE_ENV = 'production';

// Add body parser middleware to parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', router);

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port);

export default app;
