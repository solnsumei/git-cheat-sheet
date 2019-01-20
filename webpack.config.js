const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = {
  devtool: 'source-map',
  entry: './client/src/index',
  target: 'web',
  output: {
    path: path.join(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('styles.css'),
  ],
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'client/src'),
        loaders: ['babel-loader']
      },
      {
        test: /(\.css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
          ]
        })
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000' },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
};
