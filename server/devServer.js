import express from 'express';
import webpack from 'webpack';
import path from 'path';
import bodyParser from 'body-parser';
import './database';
import config from '../webpack.config.dev';
import router from './router/index';

// Set up express app
const app = express();
const compiler = webpack(config);

// Add body parser middleware to parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Webpack middlewares for development
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/api/v1', router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/index.html'));
});

app.listen(3000);

export default app;
