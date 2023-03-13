const webpack = require('webpack');

const path = require('path');

module.exports = {
  target: 'node',
  // mode: process.env.NODE_ENV, //default is production
  entry: './src/server/server.ts',
  output: {
    path: path.join(__dirname, '/src/server'),
    filename: 'server.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.ts', '.tsx'],
  },
};
